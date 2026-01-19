"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { 
  Plus, ExternalLink, Star, Trophy, Loader2, 
  ThumbsUp, UserCircle 
} from "lucide-react";

// --- Types ---
interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  averageRating: number;
  totalVotes: number;
  addedBy: string;
}

interface User {
  email: string;
  username?: string;
  role?: string; 
  id?: number;
}

export default function DocsPage() {
const params = useParams();
const langId = (params?.langId as string)?.toLowerCase() || "react";

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  
  // Data State
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); 

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", url: "" });

  // --- EFFECT: Check Auth on Load ---
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  // --- EFFECT: Fetch Resources ---
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/resources/${langId}`);
        setResources(res.data);
      } catch (err) {
        console.error("Error loading resources:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [langId, refreshKey]);

  // --- HANDLER: Add Resource ---
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/v1/resources", {
        ...formData,
        topic: langId,
        addedBy: user.username || user.email
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Reset form and refresh list
      setShowForm(false);
      setFormData({ title: "", description: "", url: "" });
      setRefreshKey(prev => prev + 1);
      alert("Resource added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add resource. (Check Backend Logs)");
    }
  };

  // --- HANDLER: Rate Resource ---
  const handleRate = async (id: number, score: number) => {
    if (!user) {
        alert("Please log in to rate.");
        return;
    }
    
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/api/v1/resources/${id}/rate`, 
        { score : score,
          userId : user.id},
        { headers: { Authorization: `Bearer ${token}` }}
      );
      // Refresh to show new average score
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      alert("Failed to save rating.");
    }
  };

  // --- ADMIN CHECK (UPDATED) ---
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-slate-200 pb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-extrabold capitalize text-slate-900 tracking-tight">
                {langId} Resources
                </h1>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                    Community Curation
                </span>
            </div>
            <p className="text-slate-500 text-lg">
              Top-rated guides, videos, and docs curated by the community.
            </p>
          </div>
          
          {/* ADD BUTTON (Admin Only) */}
          {isAdmin ? (
            <button 
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
            >
              <Plus size={18} /> 
              {showForm ? "Close Form" : "Add Resource"}
            </button>
          ): null}
        </div>

        {/* ADD RESOURCE FORM */}
        {showForm && (
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 mb-10 animate-in fade-in slide-in-from-top-4 ring-1 ring-black/5">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Plus className="text-blue-600" /> New Resource
            </h3>
            <form onSubmit={handleAdd} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                    <input 
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="e.g. React Official Documentation" 
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">URL</label>
                    <input 
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="https://..." 
                        value={formData.url}
                        onChange={e => setFormData({...formData, url: e.target.value})}
                        required
                    />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                <textarea 
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Why is this resource good?" 
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                    type="button" 
                    onClick={() => setShowForm(false)} 
                    className="px-5 py-2.5 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-md transition-all"
                >
                    Save Resource
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        )}

        {/* RESOURCE LIST */}
        <div className="space-y-5">
          {!loading && resources.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-400 text-lg font-medium">No resources found for {langId}.</p>
              {isAdmin && <p className="text-blue-500 text-sm mt-2">Be the first to add one!</p>}
            </div>
          )}

          {resources.map((res, index) => (
            <div key={res.id} className="group bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col md:flex-row gap-6">
              
              {/* RANKING BADGE */}
              <div className="flex flex-col items-center justify-center min-w-[100px] bg-slate-50 rounded-2xl p-4 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                {index === 0 ? (
                    <Trophy className="text-yellow-500 mb-2 drop-shadow-sm" size={28} />
                ) : (
                    <span className="text-slate-300 font-black text-xl mb-1">#{index + 1}</span>
                )}
                <span className="text-3xl font-black text-slate-800 tracking-tight">{res.averageRating ? res.averageRating.toFixed(1) : "0.0"}</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-1">{res.totalVotes} Votes</span>
              </div>

              {/* CONTENT */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            {res.title}
                            <ExternalLink size={20} className="text-slate-300 group-hover:text-blue-400" />
                            </a>
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                            <UserCircle size={14} /> Added by {res.addedBy}
                        </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed mb-6">
                        {res.description}
                    </p>
                </div>

                {/* ACTION BAR */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Rate Quality:</span>
                  <div className="flex gap-2">
                    {[10, 8, 5].map(score => (
                        <button 
                        key={score}
                        onClick={() => handleRate(res.id, score)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            score >= 8 
                            ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                            : score >= 5 
                            ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                        >
                        {score === 10 ? <ThumbsUp size={12} /> : <Star size={12} />} {score}
                        </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}