import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TOKEN_STORAGE_KEY } from "@/shared/config/token";

interface UserState {
  token: string | null;
}

const getInitialToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

const initialState: UserState = {
  token: getInitialToken(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
