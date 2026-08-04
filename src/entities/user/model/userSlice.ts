import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "@/shared/config/token";

export interface AuthUser {
  id: number;
  email: string;
  role: string;
  createdAt: string;
}

interface UserState {
  token: string | null;
  user: AuthUser | null;
}

const getInitialToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

const getInitialUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as AuthUser;
    if (
      typeof parsed?.id === "number" &&
      typeof parsed?.email === "string" &&
      typeof parsed?.role === "string"
    ) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
};

const initialState: UserState = {
  token: getInitialToken(),
  user: getInitialUser(),
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
      state.user = null;
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, clearToken, setUser } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
