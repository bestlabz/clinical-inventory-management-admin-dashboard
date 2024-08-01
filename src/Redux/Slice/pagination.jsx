import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  totalCount: null,

  limitCount: [
    {label: 10, value: 10},
    {label: 25, value: 25},
    {label: 50, value: 50},

  ]
};

export const paginationSlice = createSlice({
  name: "paginationValues",
  initialState,
  reducers: {
    //patients
    setNextPage: (state) => {
      state.currentPage += 1;
    },
    setPrePage: (state) => {
      if (state.currentPage !== 1) {
        state.currentPage = state.currentPage - 1;
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalCount: (state, action) => {
        state.totalCount = action.payload;
      },
  },
});

// Export actions and reducer
export const { setNextPage, setPrePage, setCurrentPage, setTotalCount } =
  paginationSlice.actions;
export default paginationSlice.reducer;
