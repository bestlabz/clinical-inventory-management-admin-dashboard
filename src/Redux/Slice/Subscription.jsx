import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptionNames: [],
};

export const subscriptionSlice = createSlice({
    name: 'subscriptionValues',
    initialState,
    reducers: {
        AddSubscription: (state, action) => {
            state.subscriptionNames =  action.payload
        },
       
    },
});

// Export actions and reducer
export const { AddSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
