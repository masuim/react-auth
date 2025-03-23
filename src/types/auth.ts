export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthSuccessResponse {
  status: "success";
  statusCode: number;
  data: {
    token: string;
    user: User;
  };
}

export interface AuthErrorResponse {
  status: "error";
  statusCode: number;
  message: string;
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
  passwordConfirmation: string;
}
