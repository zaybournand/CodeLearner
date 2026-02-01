"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  CheckCircle2, Circle, ArrowDown, BookOpen, 
  MessageSquare, ArrowLeft, Loader2, Plus 
} from 'lucide-react';
import { API_URL } from "@/app/utils/api";

// --- Types ---
interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface User {
  id: number;
  email: string;
  role?: string;
}

export default function RoadmapPage() {
  const params = useParams();
  const router = useRouter();
  
  // Safe fallback for language ID
  const langId = (params?.langId as string)?.toLowerCase() || "react";

  // State
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Admin State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStep, setNewStep] = useState({ title: "", description: "" });

  // Check Auth
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("User parse error");
      }
    }
  }, []);

  
  // Fetch Roadmap Data
  const fetchRoadmap = async () => {
    setLoading(true);
    const userIdQuery = user?.id ? `?userId=${user.id}` : "";
    
    try {
      const token = localStorage.getItem("token");
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      const res = await axios.get(
        `${API_URL}/api/v1/roadmaps/${langId}${userIdQuery}`,
        config
      );
      setSteps(res.data);
    } catch (err) {
      console.error("Failed to load roadmap", err);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when user or language changes
  useEffect(() => {
    if (user !== undefined) { 
        fetchRoadmap();
    }
  }, [langId, user]);

  // Toggle Completion
  const handleToggle = async (stepId: number) => {
    if (!user) {
        alert("Please log in to track your progress.");
        return;
    }

    try {
      setSteps(prev => prev.map(s => 
        s.id === stepId ? { ...s, completed: !s.completed } : s
      ));

      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/v1/roadmaps/${stepId}/toggle`, 
        { userId: user.id },
        { headers: { Authorization: `Bearer ${token}` } } 
      );
    } catch (err) {
      console.error(err);
      alert("Failed to save progress");
      fetchRoadmap(); 
    }
  };

  // Add Step (Admin Only)
  const handleAddStep = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");

        await axios.post(
            `${API_URL}/api/v1/roadmaps`, 
            {
                topic: langId,
                title: newStep.title,
                description: newStep.description,
                stepOrder: steps.length + 1
            },
            { headers: { Authorization: `Bearer ${token}` } } 
        );

        setNewStep({ title: "", description: "" });
        setShowAddForm(false);
        fetchRoadmap();
    } catch (err) {
        console.error(err);
        alert("Failed to add step");
    }
  };

  const isAdmin = user?.role === "ADMIN";

  // Calculate Progress %
  const completedCount = steps.filter(s => s.completed).length;
  const progress = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <button 
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors"
            >
                <ArrowLeft size={20} /> Back
            </button>
            
            {isAdmin && (
                <button 
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm"
                >
                    <Plus size={16} /> Add Step
                </button>
            )}
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold capitalize mb-2">{langId} Roadmap</h1>
          <p className="text-slate-500">Follow this path to become an expert.</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-12">
            <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-slate-700">Your Progress</span>
                <span className="text-2xl font-black text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>

        {/* Admin Add Form */}
        {showAddForm && (
            <form onSubmit={handleAddStep} className="bg-white p-6 rounded-xl border border-blue-100 shadow-lg mb-8">
                <h3 className="font-bold mb-4">Add New Step</h3>
                <input 
                    className="w-full mb-3 p-3 border rounded-lg"
                    placeholder="Step Title"
                    value={newStep.title}
                    onChange={e => setNewStep({...newStep, title: e.target.value})}
                    required
                />
                <textarea 
                    className="w-full mb-3 p-3 border rounded-lg"
                    placeholder="Description"
                    value={newStep.description}
                    onChange={e => setNewStep({...newStep, description: e.target.value})}
                    required
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold w-full">Save</button>
            </form>
        )}

        {/* Steps List */}
        {loading ? (
            <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-blue-600" />
            </div>
        ) : (
            <div className="space-y-6 relative">
                {/* The Vertical Line */}
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-200 -z-10" />

                {steps.map((step, index) => (
                    <div key={step.id} className="flex gap-6 group">
                        {/* Checkbox / Circle */}
                        <button 
                            onClick={() => handleToggle(step.id)}
                            className={`flex-shrink-0 w-14 h-14 rounded-full border-4 flex items-center justify-center transition-all bg-white z-10 ${
                                step.completed 
                                ? 'border-blue-600 text-blue-600 shadow-blue-100 shadow-lg' 
                                : 'border-slate-200 text-slate-300 hover:border-blue-300'
                            }`}
                        >
                            {step.completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                        </button>

                        {/* Content Card */}
                        <div className={`flex-1 bg-white p-6 rounded-2xl border transition-all ${
                            step.completed ? 'border-blue-200 shadow-md' : 'border-slate-200 shadow-sm opacity-90'
                        }`}>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className={`text-xl font-bold ${step.completed ? 'text-slate-900' : 'text-slate-700'}`}>
                                    {step.title}
                                </h3>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step {index + 1}</span>
                            </div>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}

                {steps.length === 0 && !loading && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed">
                        <p className="text-slate-400">No steps yet. Admin needs to add them!</p>
                    </div>
                )}
            </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-blue-600 rounded-3xl p-8 text-center text-white shadow-xl shadow-blue-200">
          <h2 className="text-2xl font-bold mb-2">Stuck on a step?</h2>
          <p className="mb-6 opacity-90 text-blue-100">Our community is here to help you move forward.</p>
          <button 
            onClick={() => router.push(`/${langId}/chat`)}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-bold transition-colors inline-flex items-center gap-2"
          >
            <MessageSquare size={18} /> Join the {langId} Chat
          </button>
        </div>
      </div>
    </div>
  );
}