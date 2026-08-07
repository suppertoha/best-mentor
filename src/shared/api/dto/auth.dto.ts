export interface AuthCredentialsDto {
  email: string;
  password: string;
}

export type LoginDto = AuthCredentialsDto;
export type RegisterDto = AuthCredentialsDto;

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterResponse {
  accessToken?: string;
}
