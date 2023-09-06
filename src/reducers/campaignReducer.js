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
    setCampaign: (state, { payload }) => {
      state.data = payload;
    },
    setNewCampaign: (state) => {
      state.data = createNewCampaign();
    },
    setLoadedCampaign: (state, { payload }) => {
      state.data = payload;
      state.isALoadedCampaign = true;
    },
    addNode: (state) => {
      const newNode = createNewNode(
        state.selectedNode.id
      );

      state.data.nodes[newNode.id] = newNode;
      state.data.nodes[state.selectedNode.id].childrenIds = [
        ...state.data.nodes[state.selectedNode.id].childrenIds,
        newNode.id
      ];

      // select newly created node
      state.selectedNode = newNode;
    },
    updateNode: (state, { payload }) => {
      let node = {
        id: payload.id,
        name: payload.name,
        description: payload.description,
        type: payload.type,
        parentId: payload.parentId,
        childrenIds: payload.childrenIds,
        intel: payload.intel,
        notes: payload.notes,
        isUnlocked: payload.isUnlocked,
        hasVisited: payload.hasVisited,
        isAvailable: payload.isAvailable
      };

      state.data.nodes[node.id] = node;

      // update selected state
      state.selectedNode = node;
    },
    setSelectedNode: (state, { payload }) => {
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
  updateNode: updateNode,
  setSelectedNode,
  deselectNode,
} = campaignSlice.actions;

export default campaignSlice.reducer;