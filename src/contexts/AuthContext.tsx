import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginService, AuthResponse } from '../services/auth';

export type User = AuthResponse['user'];

interface AuthContextData {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        setLoading(true);
        const token = await AsyncStorage.getItem('auth_token');
        const userData = await AsyncStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }

    async function signIn(email: string, password: string) {
        setLoading(true);
        try {
            const response = await loginService(email, password);
            await AsyncStorage.setItem('auth_token', response.token);
            await AsyncStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
        } finally {
            setLoading(false);
        }
    }

    async function signOut() {
        setLoading(true);
        await AsyncStorage.multiRemove(['token', 'user']);
        setUser(null);
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}