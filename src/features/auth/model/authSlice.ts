import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authThunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null as string | null,
    isLoading: false,
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.error.message ?? "Ошибка входа");
      });
  },
});

export const { logout } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
