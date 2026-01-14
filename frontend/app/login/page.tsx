"use client";
import React, { useState } from "react";
import axios from "axios";

// Standard HTML components to avoid build errors
const Input = ({ className = "", ...props }: any) => (
  <input
    className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 ${className}`}
    {...props}
  />
);

const Button = ({ children, className = "", ...props }: any) => (
  <button
    className={`w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ message: "", type: "" });

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { email, password },
        { withCredentials: true } 
      );

      // --- CRITICAL FIX START ---
      // We MUST save the token and user data, otherwise the Home Page stays "Logged Out"
      const token = res.data.token || res.data.jwt || res.data.accessToken;
      
      if (token) {
        localStorage.setItem("token", token);
        
        // Save user details (fallback to email if backend only sends token)
        const userToSave = {
            email: res.data.email || email,
            username: res.data.username || "",
            id: res.data.id
        };
        localStorage.setItem("user", JSON.stringify(userToSave));

        setFeedback({ message: "Login successful! Redirecting...", type: "success" });
        
        // Force reload to Home Page so it picks up the new localStorage
        setTimeout(() => {
            window.location.href = "/"; 
        }, 500);
      } else {
        throw new Error("No token received");
      }
      // --- CRITICAL FIX END ---

    } catch (err: any) {
      console.error(err);
      let errorMessage = "Login failed. Please try again.";
      if (err.response?.status === 401) errorMessage = "Invalid email or password.";
      if (err.response?.status === 403) errorMessage = "Account is banned.";
      setFeedback({ message: errorMessage, type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 font-sans">
      <div className="max-w-md w-full space-y-8 bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="text-center">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h3>
          <p className="mt-2 text-slate-400 text-sm">Log into Code Learner to continue</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Sign In</Button>

          {feedback.message && (
            <div className={`mt-2 text-center text-sm p-4 rounded-xl border duration-300 ${
                feedback.type === 'error' 
                    ? 'bg-red-500/10 text-red-200 border-red-500/50' 
                    : 'bg-green-500/10 text-green-200 border-green-500/50'
            }`}>
                {feedback.message}
            </div>
          )}
        </form>

        <p className="text-center text-slate-400 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}