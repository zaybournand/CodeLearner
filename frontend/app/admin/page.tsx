"use client"

import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save } from 'lucide-react';
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function AdminDashboard() {
  // In a real app, you would fetch this from your Spring Boot /api/admin/roadmaps
  const [activeLang, setActiveLang] = useState('react');

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Admin Control Center</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Language Selector */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 h-fit">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Edit Roadmaps</p>
            {['react', 'java', 'python', 'go'].map((l) => (
              <button 
                key={l}
                onClick={() => setActiveLang(l)}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold capitalize transition-all ${
                  activeLang === l ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Main Content - Editor */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold capitalize">{activeLang} Roadmap Steps</h2>
                <Button className="w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-xs">
                  <Plus size={16} className="mr-1" /> Add Step
                </Button>
              </div>

              {/* Placeholder for Step List */}
              <div className="space-y-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-400">#{step}</span>
                    <Input className="bg-white text-sm py-2" placeholder="Step Title" />
                    <div className="flex gap-2">
                      <Button className="w-10 h-10 p-0 bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-none border-none">
                        <Edit3 size={16} />
                      </Button>
                      <Button className="w-10 h-10 p-0 bg-red-100 text-red-600 hover:bg-red-200 shadow-none border-none">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="mt-8 bg-slate-900">
                <Save size={18} className="mr-2" /> Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}