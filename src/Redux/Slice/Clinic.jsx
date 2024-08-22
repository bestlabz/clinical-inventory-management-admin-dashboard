import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clinics: [],
  doctor_view: false,
  receptionist_view: false,
};

export const userSlice = createSlice({
  name: "clinicValues",
  initialState,
  reducers: {
    setClinic: (state, action) => {
      state.clinics = action.payload;
    },
    setDoctorView: (state) => {
      state.doctor_view = !state.doctor_view;
    },
    setReceptionistView: (state) => {
      state.receptionist_view = !state.receptionist_view;
    },
  },
});

// Export actions and reducer
export const { setClinic, setDoctorView, setReceptionistView } =
  userSlice.actions;
export default userSlice.reducer;
