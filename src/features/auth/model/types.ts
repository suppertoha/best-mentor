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
}

export interface LoginResponse {
  accessToken: string;
}
