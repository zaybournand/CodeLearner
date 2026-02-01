"use client";

import React, { useState, useEffect } from "react";
import { API_URL } from "../utils/api";
import axios from "axios";
import { 
  Trophy, ArrowRight, Loader2, BookOpen, Layout, CheckCircle2 
} from "lucide-react";

// --- Types ---
interface DashboardStat {
  topic: string;
  totalSteps: number;
  completedSteps: number;
  percentage: number;
}

interface User {
  id: number;
  email: string;
  username?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState(true);

  // Check Auth
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!token || !storedUser) {
        // Redirect if not logged in
        window.location.href = "/login";
        return;
    }
    setUser(JSON.parse(storedUser));
  }, []);

  // Fetch Stats from NEW Dashboard Endpoint
  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      
      try {
        // Calling your new dedicated Dashboard Controller
        const res = await axios.get(`${API_URL}/api/v1/dashboard/stats?userId=${user.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchStats();
  }, [user]);

  // Handle Navigation (Simulated for preview)
  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-500 text-lg">
            Welcome back, <span className="font-bold text-blue-600">{user?.username || user?.email}</span>. Here is your progress.
          </p>
        </div>

        {/* Loading */}
        {loading && (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        )}

        {/* Empty State */}
        {!loading && stats.length === 0 && (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="text-blue-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Start your journey!</h3>
                <p className="text-slate-500 mb-6">You haven't started any roadmaps yet.</p>
                <button 
                    onClick={() => navigateTo('/')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                    Explore Roadmaps
                </button>
            </div>
        )}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat) => (
                <div key={stat.topic} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-full group">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-slate-100 p-3 rounded-xl group-hover:bg-blue-50 transition-colors">
                                <Layout className="text-slate-600 group-hover:text-blue-600" size={24} />
                            </div>
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {stat.topic}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-900 capitalize mb-1">
                            {stat.topic} Path
                        </h3>
                        <p className="text-slate-500 text-sm mb-6">
                            {stat.completedSteps} / {stat.totalSteps} Steps Completed
                        </p>
                    </div>

                    <div>
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                    stat.percentage === 100 ? 'bg-green-500' : 'bg-blue-600'
                                }`}
                                style={{ width: `${stat.percentage}%` }}
                            />
                        </div>

                        <button 
                            onClick={() => navigateTo(`/${stat.topic}/roadmap`)}
                            className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                        >
                            {stat.percentage === 100 ? "Review Path" : "Continue Learning"}
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Quick Actions Footer */}
        {!loading && stats.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200 flex justify-center">
                <button 
                    onClick={() => navigateTo('/')}
                    className="text-slate-500 font-bold hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                    <PlusIcon /> Browse more languages
                </button>
            </div>
        )}

      </div>
    </div>
  );
}

// Simple Plus Icon Helper
const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5v14" />
    </svg>
);