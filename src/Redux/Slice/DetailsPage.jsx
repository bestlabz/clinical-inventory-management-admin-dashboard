import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: null,
  details1: null,

};

export const paginationSlice = createSlice({
  name: "detailsValues",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setDetails1: (state, action) => {
      state.details1 = action.payload;
    },
  },
});

// Export actions and reducer
export const { setDetails, setDetails1 } = paginationSlice.actions;
export default paginationSlice.reducer;
