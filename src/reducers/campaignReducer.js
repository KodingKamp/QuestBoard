import { createSlice } from "@reduxjs/toolkit";
import { createNewCampaign } from "../services/campaignService";

const initialState = {
  data: null,
  isALoadedCampaign: false,
};

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCampaign: (state, action) => {
      state.data = action.payload;
    },
    setNewCampaign: (state) => {
      state.data = createNewCampaign();
    },
    setLoadedCampaign: (state, action) => {
      state.data = action.payload;
      state.isALoadedCampaign = true;
    },
  },
});



export const {
  setCampaign,
  setNewCampaign,
  setLoadedCampaign,
} = campaignSlice.actions;

export default campaignSlice.reducer;