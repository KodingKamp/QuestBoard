import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./reducers/campaignReducer";
import classReducer from "./reducers/classReducer";

// https://react-redux.js.org
export default configureStore({
  reducer: {
    campaign: campaignReducer,
    classes: classReducer
  },
});