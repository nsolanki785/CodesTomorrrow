import { configureStore } from "@reduxjs/toolkit";
import fileExploreReducer from "../slices";
export const store = configureStore({
  reducer: {
    fileExplores: fileExploreReducer,
  },
});
