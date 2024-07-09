import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clinics: []
};

export const userSlice = createSlice({
    name: 'clinicValues',
    initialState,
    reducers: {
        setClinic: (state, action) => {
            state.clinics = action.payload;
        },
    },
});

// Export actions and reducer
export const { setClinic } = userSlice.actions;
export default userSlice.reducer;
