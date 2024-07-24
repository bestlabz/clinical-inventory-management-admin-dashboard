import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptionNames: [],
  subscriptionCard: []
};

export const subscriptionSlice = createSlice({
    name: 'subscriptionValues',
    initialState,
    reducers: {
        AddSubscription: (state, action) => {
            state.subscriptionNames =  action.payload
        },

        AddSubscriptionCard: (state, action) => {
            state.subscriptionCard =  action.payload
        },
       
    },
});

// Export actions and reducer
export const { AddSubscription, AddSubscriptionCard } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
