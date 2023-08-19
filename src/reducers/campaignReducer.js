import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isGameMode: false,
};

export const campaignSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCampaign: (state, action) => {
      state.data = action.payload
    },
    setGameMode: (state, action) => {
      state.isGameMode = action.payload;
    },
  },
});

export const {
  setCampaign,
  setGameMode,
} = campaignSlice.actions;

export default campaignSlice.reducer;