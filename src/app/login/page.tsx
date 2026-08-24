"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { user, dbUser, loading, loginWithGoogle, loginDemo, logout } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>("student");
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    setError(null);
    setSigningIn(true);
    try {
      await loginWithGoogle(selectedRole);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/unauthorized-domain" || err.message?.includes("unauthorized-domain")) {
        setError("Firebase Notice: This preview domain is not added to Firebase Authorized Domains yet. Click 'Continue in Demo Mode' below to proceed seamlessly into your portal!");
      } else {
        setError(err.message || "Failed to sign in with Google.");
      }
    } finally {
      setSigningIn(false);
    }
  };

  const handleDemoSignIn = async () => {
    setError(null);
    setSigningIn(true);
    try {
      await loginDemo(selectedRole);
    } catch (err: any) {
      setError("Failed to enter demo mode.");
    } finally {
      setSigningIn(false);
    }
  };

  const getPortalLink = (role: string) => {
    switch (role) {
      case "admin": return "/portals/admin";
      case "tutor": return "/portals/tutor";
      case "parent": return "/portals/parent";
      default: return "/portals/student";
    }
  };

  return (
    <section className="py-20 bg-bg-light min-h-[70vh] flex items-center">
      <div className="max-w-md mx-auto px-6 w-full">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex items-center justify-center">
            <img
              src="https://drive.google.com/thumbnail?id=1V_yl0l4lk5DlYsjb3jksFSq745E3LO-g&sz=w1000"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('drive.google.com')) {
                  target.src = 'https://lh3.googleusercontent.com/d/1V_yl0l4lk5DlYsjb3jksFSq745E3LO-g';
                } else if (target.src.includes('googleusercontent.com')) {
                  target.src = '/logo.png';
                }
              }}
              alt="ACE Education Official Crest Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-navy">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm">Sign in to your ACE Education account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          {user ? (
            <div className="space-y-6 text-center">
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-100 text-sm">
                <p className="font-semibold">Successfully Signed In!</p>
                <p className="text-xs text-emerald-600 mt-1">{user.email}</p>
              </div>

              {dbUser && (
                <div className="bg-bg-light p-4 rounded-2xl border border-gray-100 text-sm text-left">
                  <p className="text-gray-500 text-xs uppercase font-semibold tracking-wider">Account Profile</p>
                  <p className="font-bold text-navy mt-1">Role: <span className="capitalize text-gold">{dbUser.role}</span></p>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">ID: {dbUser.id} • Cloud SQL Sync Active</p>
                </div>
              )}

              <div className="space-y-3">
                <Link 
                  href={getPortalLink(dbUser?.role || "student")} 
                  className="w-full block bg-navy hover:bg-navy-light text-white font-bold py-3.5 rounded-xl text-sm transition-all text-center shadow-md shadow-navy/20"
                >
                  Enter Portal
                </Link>
                <button 
                  onClick={logout} 
                  className="w-full border-2 border-gray-200 hover:border-red-200 hover:text-red-600 text-gray-600 font-bold py-3 rounded-xl text-sm transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-700 p-3.5 rounded-xl border border-red-100 text-xs font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider text-center">
                  Select your Portal Role to sign in as
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {(["student", "parent", "tutor", "admin"] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold capitalize transition-all border-2 ${
                        selectedRole === role
                          ? "border-gold bg-gold/10 text-navy"
                          : "border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-500"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Secure Google Authentication</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading || signingIn}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl text-sm transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.64l3.15-3.15C17.45 1.84 14.93 1 12 1 7.37 1 3.4 3.66 1.45 7.55l3.78 2.93C6.12 7.02 8.82 5.04 12 5.04z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.44c-.28 1.44-1.1 2.67-2.33 3.5l3.6 2.79c2.1-1.94 3.78-5.12 3.78-8.45z"/>
                  <path fill="#FBBC05" d="M5.23 10.48c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28L1.45 3.51C.65 5.12.18 6.94.18 8.9c0 1.96.47 3.78 1.27 5.39l3.78-2.93a5.9 5.9 0 010-4.56z"/>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.93l-3.6-2.79c-1 .67-2.28 1.07-3.6 1.07-3.18 0-5.88-1.98-6.84-4.91L1.14 16.33C3.09 20.24 7.06 23 12 23z"/>
                </svg>
                {signingIn ? "Signing in..." : `Sign in with Google (${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)})`}
              </button>

              <button
                onClick={handleDemoSignIn}
                disabled={loading || signingIn}
                className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                Continue in Demo Mode ({selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)})
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink mx-4 text-gray-300 text-xs font-medium uppercase tracking-wider">Demo / Sandbox Link</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Link href="/portals/parent" className="text-center text-[10px] font-semibold text-navy hover:text-gold transition-colors py-2 bg-bg-light rounded-lg border border-gray-100">Parent Sandbox</Link>
                <Link href="/portals/student" className="text-center text-[10px] font-semibold text-navy hover:text-gold transition-colors py-2 bg-bg-light rounded-lg border border-gray-100">Student Sandbox</Link>
                <Link href="/portals/tutor" className="text-center text-[10px] font-semibold text-navy hover:text-gold transition-colors py-2 bg-bg-light rounded-lg border border-gray-100">Tutor Sandbox</Link>
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account? <Link href="/book-assessment" className="text-gold font-semibold hover:underline">Book a Free Assessment</Link>
        </p>
      </div>
    </section>
  );
}
