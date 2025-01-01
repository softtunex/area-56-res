import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";

// Configure the store
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer, // Add the sidebar slice reducer
  },
});

// Type definitions for TypeScript
export type RootState = ReturnType<typeof store.getState>; // Infer the state shape
export type AppDispatch = typeof store.dispatch; // Infer the dispatch type
