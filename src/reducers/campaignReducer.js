import { createSlice } from "@reduxjs/toolkit";
import { createNewCampaign, createNewNode } from "../services/campaignService";

const initialState = {
  data: null,
  isALoadedCampaign: false,
  selectedNode: null,
};

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCampaign: (state, {payload}) => {
      state.data = payload;
    },
    setNewCampaign: (state) => {
      state.data = createNewCampaign();
    },
    setLoadedCampaign: (state, {payload}) => {
      state.data = payload;
      state.isALoadedCampaign = true;
    },
    addNode: (state, {payload}) => {
      const node = createNewNode(
        payload.nodeName,
        payload.type,
        payload.description,
        payload.parentNode = 'Root',
        payload.unlockedByDefault
      );

      state.data.nodes[node.id] = node;
      state.data.nodes[payload.parentNode].children = [...state.data.nodes[payload.parentNode].children, node.id];
    },
  },
});



export const {
  setCampaign,
  setNewCampaign,
  setLoadedCampaign,
  addNode,
} = campaignSlice.actions;

export default campaignSlice.reducer;