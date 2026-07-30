import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { api } from "@/shared/api";
import type { LoginDto, LoginResponse } from "./types";

export const loginUser = createAsyncThunk<LoginResponse, LoginDto>(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post<LoginResponse>("/auth/login", loginData);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          typeof error.response?.data === "object" &&
          error.response.data !== null &&
          "message" in error.response.data &&
          typeof error.response.data.message === "string"
            ? error.response.data.message
            : error.message;

        return rejectWithValue(message);
      }

      return rejectWithValue("Ошибка входа");
    }
  },
);
