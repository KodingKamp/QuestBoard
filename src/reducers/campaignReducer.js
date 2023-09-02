import { createSlice } from "@reduxjs/toolkit";
import { createNewCampaign, createNewNode } from "../services/campaignService";

const initialState = {
  data: null,
  isALoadedCampaign: false,
  selectedNode: {
    id: 'Root',
    name: 'Root',
  },
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
      state.data.nodes[state.selectedNode.id].childrenIds = [...state.data.nodes[state.selectedNode.id].childrenIds, node.id];
    },
    setSelectedNode: (state, {payload}) => {
      state.selectedNode = payload;
    },
    deselectNode: (state) => {
      state.selectedNode = initialState.selectedNode;
    },
  },
});

export const {
  setCampaign,
  setNewCampaign,
  setLoadedCampaign,
  addNode,
  setSelectedNode,
  deselectNode,
} = campaignSlice.actions;

export default campaignSlice.reducer;