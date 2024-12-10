"use client"
import React, { createContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, UserCredential, GoogleAuthProvider, User } from 'firebase/auth';
import auth from '../firebase/firebase.config';

export interface AuthContextType {
    user: User | null;
    createUser: (email: string, password: string) => Promise<UserCredential>;
    loginUser: (email: string, password: string) => Promise<UserCredential>;
    googleSignIn: () => Promise<UserCredential>;
    logout: () => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email: string, password: string): Promise<UserCredential> => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email: string, password: string): Promise<UserCredential> => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = (): Promise<UserCredential> => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const logout = (): Promise<void> => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo: AuthContextType = {
        user,
        createUser,
        loginUser,
        googleSignIn,
        logout,
        loading
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
