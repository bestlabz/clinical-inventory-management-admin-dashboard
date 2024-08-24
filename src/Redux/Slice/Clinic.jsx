import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clinics: [],
  doctor_view: false,
  receptionist_view: false,
  balance_due: null,
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
    addBalanceDue: (state, action) => {
      state.balance_due = action.payload;
    },
  },
});

// Export actions and reducer
export const { setClinic, setDoctorView, setReceptionistView, addBalanceDue } =
  userSlice.actions;
export default userSlice.reducer;
