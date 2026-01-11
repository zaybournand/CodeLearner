"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input"; 
import { Button } from "@/components/Button";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ message: "", type: "" });

    try {
      const res = await axios.post(
        "http://localhost:8080/login",
        { email, password },
        { withCredentials: true } 
      );

      setFeedback({ message: "Login successful! Redirecting...", type: "success" });
      
      setTimeout(() => {
        router.push(res.data.isAdmin ? "/admin" : "/dashboard");
      }, 1000);

    } catch (err: any) {
      let errorMessage = "Login failed. Please try again.";
      if (err.response?.status === 401) errorMessage = "Invalid email or password.";
      if (err.response?.status === 403) errorMessage = "Account is banned.";
      setFeedback({ message: errorMessage, type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full space-y-8 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
        <div className="text-center">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h3>
          <p className="mt-2 text-slate-400 text-sm">Log into Code Learner to continue</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Sign In</Button>

          {feedback.message && (
            <div className={`mt-2 text-center text-sm p-4 rounded-xl border animate-in fade-in zoom-in duration-300 ${
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
          <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}