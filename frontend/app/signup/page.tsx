"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input"; 
import { Button } from "@/components/Button";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ message: "", type: "" });

    if (password !== confirm) {
      setFeedback({ message: "Passwords do not match.", type: "error" });
      return;
    }

    try {
      // Updated to match your Spring Boot port if applicable, 
      // or kept at 5000 if that is where your auth server lives.
      const res = await axios.post(
        "http://localhost:5000/signup",
        { email, password },
        { withCredentials: true } 
      );

      setFeedback({ message: "Account created! Redirecting...", type: "success" });
      
      setTimeout(() => {
          // Redirecting to the home page so they can pick a language
          router.push("/");
      }, 1500);

    } catch (err: any) {
      let errorMessage = "Signup failed. Try again later.";
      
      if (err.response?.data?.error) {
          errorMessage = err.response.data.error;
      } else if (err.message) {
          errorMessage = err.message;
      }

      setFeedback({ message: errorMessage, type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full space-y-8 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm shadow-2xl">
        <div className="text-center">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            Join Code Learner
          </h3>
          <p className="mt-2 text-slate-400">
            Create your account to start mastering tech
          </p>
        </div>

        <form onSubmit={handleSignup} className="mt-8 space-y-4">
          <div className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />

              <Button type="submit" className="mt-2">
                Create Account
              </Button>

              {feedback.message && (
                <div className={`mt-2 text-center text-sm p-4 rounded-xl border animate-in fade-in zoom-in duration-300 ${
                    feedback.type === 'error' 
                        ? 'bg-red-500/10 text-red-200 border-red-500/50' 
                        : 'bg-green-500/10 text-green-200 border-green-500/50'
                }`}>
                    {feedback.message}
                </div>
              )}
          </div>
        </form>

        <p className="text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}