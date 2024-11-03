import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user database
const users: User[] = [
  {
    id: '1',
    email: 'alice@example.com',
    name: 'Alice Chen',
    password: 'hashed_password_1',
    role: 'student',
  },
  {
    id: '2',
    email: 'bob@example.com',
    name: 'Bob Smith',
    password: 'hashed_password_2',
    role: 'student',
  },
  {
    id: 'teacher',
    email: 'teacher@example.com',
    name: 'Dr. Smith',
    password: 'teacher_password',
    role: 'teacher',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, password: string, name: string) => {
    try {
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        password, // In real app, hash password
        role: 'student',
      };

      users.push(newUser);
      setUser(newUser);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      setUser(user);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};