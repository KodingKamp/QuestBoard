import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./reducers/campaignReducer";

// https://react-redux.js.org
export default configureStore({
  reducer: {
    campaign: campaignReducer,
  },
});