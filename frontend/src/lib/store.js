// lib/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from "./reducers";

const rootReducer = combineReducers({
  app: appReducer,
  // Add other reducers here
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
