export enum Role {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string; // UUID
  fullName: string;
  email: string;
  password?: string; // Optional for responses
  role: Role;
}

export interface UserCreateDto {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface UserUpdateDto {
  fullName?: string;
  email?: string;
  password?: string;
  role?: Role;
}