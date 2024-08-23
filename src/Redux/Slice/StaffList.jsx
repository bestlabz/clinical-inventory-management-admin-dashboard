import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor_list: [],
  receptionist_list: [],
  doctor_current_page: 1,
  doctor_total_pages: null,
  doctor_limit: 10,
  receptionist_current_page: 1,
  receptionist_total_pages: null,
  receptionist_limit: 10,
  staff_id:null,
  clinic_id:null,
};

export const userSlice = createSlice({
  name: "staffList",
  initialState,
  reducers: {
    addDoctorList: (state, action) => {
      state.doctor_list = action.payload;
    },
    addDoctorCurrentPage: (state, action) => {
      state.doctor_current_page = action.payload;
    },
    addDoctorTotalPage: (state, action) => {
      state.doctor_total_pages = action.payload;
    },
    addDoctorLimit: (state, action) => {
      state.doctor_limit = action.payload;
    },
    addReceptionistList: (state, action) => {
      state.receptionist_list = action.payload;
    },
    addReceptionistCurrentPage: (state, action) => {
      state.receptionist_current_page = action.payload;
    },
    addReceptionistTotalPage: (state, action) => {
      state.receptionist_total_pages = action.payload;
    },
    addReceptionistLimit: (state, action) => {
      state.receptionist_limit = action.payload;
    },
    addStaffID: (state, action) => {
        state.staff_id = action.payload;
    },
    addClinicID: (state, action) => {
        state.clinic_id = action.payload;
    },
    clearStaffDetails: (state, action) => {
        state.doctor_list = [];
        state.receptionist_list = [];
        state.doctor_current_page = 1;
        state.doctor_total_pages = null;
        state.doctor_limit = 10;
        state.receptionist_current_page = 1;
        state.receptionist_total_pages = null;
        state.receptionist_limit = 10;
        state.staff_id = null;
        state.clinic_id = null;
    }
  },
});

// Export actions and reducer
export const {
  addDoctorList,
  addReceptionistList,
  addDoctorCurrentPage,
  addDoctorTotalPage,
  addDoctorLimit,
  addReceptionistCurrentPage,
  addReceptionistTotalPage,
  addReceptionistLimit,
  addStaffID,
  addClinicID,
  clearStaffDetails
} = userSlice.actions;
export default userSlice.reducer;
