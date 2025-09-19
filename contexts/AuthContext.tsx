import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import Constants from 'expo-constants';

// Interfaces (kept outside runtime code, safe for TS)
interface User {
  id: string;
  email: string;
  name?: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsGuest: () => void;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Use Expo config extras for environment variables
const API_URL =
  (Constants.expoConfig?.extra?.API_URL as string) || 'http://192.168.29.134:4000'; // Your network IP

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const storedUser = await SecureStore.getItemAsync('user');
      const token = await SecureStore.getItemAsync('token');
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Make sure this matches your backend: { username, password }
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (res.ok) {
        const { token, user: userData } = await res.json();
        if (!userData.id) userData.id = email;
        setUser(userData);
        await SecureStore.setItemAsync('user', JSON.stringify(userData));
        await SecureStore.setItemAsync('token', token);
        return true;
      } else {
        const errorData = await res.json().catch(() => null);
        console.error('Login failed:', errorData);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
      setUser(null);
      router.replace('/login'); // This ensures navigation to login
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loginAsGuest = () => {
    const guestUser: User = {
      id: 'guest',
      email: 'guest@railway.com',
      name: 'Guest User',
    };
    setUser(guestUser);
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        await SecureStore.setItemAsync('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginAsGuest,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}




