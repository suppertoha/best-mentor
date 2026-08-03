export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface RegisterResponse {
  accessToken?: string;
  user?: AuthUser;
}

export interface AuthUser {
  id: number;
  email: string;
  role: string;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}
