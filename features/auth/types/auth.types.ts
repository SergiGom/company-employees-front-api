export interface LoginDto {
  correo: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface UserProfile {
  userId: number;
  correo: string;
  role: "ADMIN" | "USER";
  ciudad: string;
  companiaId: number | null;
}