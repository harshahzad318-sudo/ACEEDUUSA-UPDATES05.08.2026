"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  getIdToken
} from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebase";

interface DbUser {
  id: number;
  uid: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  dbUser: DbUser | null;
  loading: boolean;
  loginWithGoogle: (targetRole?: string) => Promise<any>;
  loginDemo: (targetRole?: string) => Promise<any>;
  logout: () => Promise<void>;
  syncUser: (currentUser: User, targetRole?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);

  const syncUser = async (currentUser: User, targetRole?: string) => {
    try {
      const token = await getIdToken(currentUser, true);
      const res = await fetch("/api/auth/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: targetRole }),
      });
      if (res.ok) {
        const data = await res.json();
        setDbUser(data.user);
      } else {
        console.error("Failed to sync user with database");
      }
    } catch (error) {
      console.error("Error in syncUser:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUser(currentUser);
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (targetRole?: string) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      if (result.user) {
        await syncUser(result.user, targetRole);
      }
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setDbUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const loginDemo = async (targetRole: string = "student") => {
    setLoading(true);
    try {
      const mockUser = {
        uid: `demo-${targetRole}-101`,
        email: `demo.${targetRole}@aceeducation.us`,
        displayName: `Demo ${targetRole.charAt(0).toUpperCase() + targetRole.slice(1)}`,
      } as any;
      setUser(mockUser);
      setDbUser({
        id: 999,
        uid: mockUser.uid,
        email: mockUser.email,
        role: targetRole,
      });
      return mockUser;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, loginWithGoogle, loginDemo, logout, syncUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
