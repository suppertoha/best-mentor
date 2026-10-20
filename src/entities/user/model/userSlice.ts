import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: number;
  email: string;
  role: 'STUDENT' | 'ADMIN';
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  githubUrl: string | null;
  telegramUsername: string | null;
  websiteUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  token: undefined | null | string;
  user: AuthUser | null;
}

const initialState: UserState = {
  token: undefined,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
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
