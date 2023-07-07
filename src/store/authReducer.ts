// store/authReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  authToken: string | null;
}

const initialState: AuthState = {
  authToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.authToken = action.payload;
    },
  },
});

export const { setAuthToken } = authSlice.actions;

export default authSlice.reducer;
