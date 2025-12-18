"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { 
  Code2, Terminal, Layout, ArrowRight, Star, 
  MessageSquare, Trophy, Sparkles, Database, Smartphone,
  LogOut, UserCircle, Loader2
} from 'lucide-react';
import { Button } from "@/components/Button";

// --- CONFIGURATION ---
const LANGUAGES = [
  { id: 'react', name: 'React', category: 'Frontend', icon: <Code2 />, color: 'text-sky-500', bg: 'bg-sky-50', desc: 'The industry standard for building modern component-based UIs.' },
  { id: 'javascript', name: 'JavaScript', category: 'Frontend', icon: <Code2 />, color: 'text-yellow-500', bg: 'bg-yellow-50', desc: 'The essential language of the web. Functional and versatile.' },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', icon: <Code2 />, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'JavaScript with syntax for types. Essential for large-scale apps.' },
  { id: 'html-css', name: 'HTML/CSS', category: 'Frontend', icon: <Layout />, color: 'text-orange-600', bg: 'bg-orange-50', desc: 'The building blocks of every website on the planet.' },
  { id: 'java', name: 'Java', category: 'Backend', icon: <Terminal />, color: 'text-red-500', bg: 'bg-red-50', desc: 'Scalable, object-oriented language for enterprise backends.' },
  { id: 'spring-boot', name: 'Spring Boot', category: 'Backend', icon: <Terminal />, color: 'text-emerald-500', bg: 'bg-emerald-50', desc: 'The most popular Java framework for microservices.' },
  { id: 'python', name: 'Python', category: 'Backend', icon: <Terminal />, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Simple syntax, massive power for AI, Data Science, and Scripts.' },
  { id: 'go', name: 'Go', category: 'Backend', icon: <Terminal />, color: 'text-cyan-500', bg: 'bg-cyan-50', desc: 'Google’s language built for high-performance cloud services.' },
  { id: 'rust', name: 'Rust', category: 'Backend', icon: <Terminal />, color: 'text-orange-700', bg: 'bg-orange-50', desc: 'Memory-safe and blazing fast. The future of systems programming.' },
  { id: 'sql', name: 'SQL', category: 'Database', icon: <Database />, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'The standard language for managing and querying databases.' },
  { id: 'cpp', name: 'C++', category: 'Systems', icon: <Terminal />, color: 'text-blue-700', bg: 'bg-blue-50', desc: 'High-performance language for games and OS development.' },
  { id: 'swift', name: 'Swift', category: 'Mobile', icon: <Smartphone />, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'The modern, safe language for Apple iOS development.' },
  { id: 'c-sharp', name: 'C#', category: 'Backend', icon: <Terminal />, color: 'text-purple-600', bg: 'bg-purple-50', desc: 'Versatile language for Web, Desktop, and Games.' },
  { id: 'ruby', name: 'Ruby', category: 'Backend', icon: <Code2 />, color: 'text-red-700', bg: 'bg-red-50', desc: 'Dynamic, open source language focused on simplicity.' }
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Mobile', 'Systems'];

export default function HomePage() {
  const [filter, setFilter] = useState('All');

  const filteredLanguages = filter === 'All' 
    ? LANGUAGES 
    : LANGUAGES.filter(l => l.category === filter);

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Trophy className="w-4 h-4" />
            <span>Join 10,000+ developers learning today</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Tech Stack</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Top-rated documentation and live community help for every major language.
          </p>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">Choose your path</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLanguages.map((lang) => (
            <div 
              key={lang.id} 
              className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className={`${lang.bg} ${lang.color} w-12 h-12 rounded-xl flex items-center justify-center mb-5 transform group-hover:rotate-6 transition-transform`}>
                  {React.cloneElement(lang.icon as any, { size: 24 })}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{lang.name}</h3>
                  <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                    {lang.category}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                  {lang.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href={`/${lang.id}/docs`} 
                  className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Star size={14} /> Docs
                </Link>
                <Link 
                  href={`/${lang.id}/chat`} 
                  className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
                >
                  <MessageSquare size={14} /> Chat
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}