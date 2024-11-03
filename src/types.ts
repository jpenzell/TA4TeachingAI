export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'student' | 'teacher';
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}