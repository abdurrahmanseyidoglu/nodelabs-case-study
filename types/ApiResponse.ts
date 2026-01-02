export interface User {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  isActive?: boolean;
  lastLoginAt?: string;
  lastLoginIP?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
  };
}

export interface ApiError {
  success: boolean;
  message: string;
}
