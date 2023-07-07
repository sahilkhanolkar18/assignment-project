import { configureStore } from "@reduxjs/toolkit";

// Import and combine your reducers
import detailsReducer from "./detailsReducer";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    details: detailsReducer,
    auth: authReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
