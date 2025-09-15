export interface User {
    email: string;
    password: string;
    name?: string; // Optional for login
    confirmPassword?: string; 
    role?: string; 
  }