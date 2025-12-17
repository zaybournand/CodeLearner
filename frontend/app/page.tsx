"use client"

import React from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Terminal, 
  Layout, 
  ArrowRight, 
  Star, 
  MessageSquare, 
  Trophy,
  Sparkles
} from 'lucide-react';

// --- LANGUAGE CONFIGURATION ---
const LANGUAGES = [
  { 
    id: 'react', 
    name: 'React', 
    icon: <Code2 />, 
    color: 'text-sky-500', 
    bg: 'bg-sky-50',
    desc: 'The library for web and native user interfaces.' 
  },
  { 
    id: 'java', 
    name: 'Java', 
    icon: <Terminal />, 
    color: 'text-red-500', 
    bg: 'bg-red-50',
    desc: 'The backbone of enterprise-grade backend systems.' 
  },
  { 
    id: 'python', 
    name: 'Python', 
    icon: <Layout />, 
    color: 'text-yellow-500', 
    bg: 'bg-yellow-50',
    desc: 'Powerful, simple, and the gold standard for AI/ML.' 
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <Trophy className="w-4 h-4" />
            <span>Join 10,000+ developers learning today</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Coding Game</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Choose a technology to access top-rated documentation, track your progress, and chat with a community of experts.
          </p>
        </div>
      </div>

      {/* Language Selection Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex items-center gap-2 mb-8 text-slate-900">
          <Sparkles className="text-blue-600" />
          <h2 className="text-2xl font-bold">Choose your path</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {LANGUAGES.map((lang) => (
            <div 
              key={lang.id} 
              className="group bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 relative overflow-hidden"
            >
              {/* Icon & Title */}
              <div className={`${lang.bg} ${lang.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-all`}>
                {React.cloneElement(lang.icon as any, { size: 32 })}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{lang.name}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                {lang.desc}
              </p>
              
              {/* Navigation Buttons */}
              <div className="flex flex-col gap-3 relative z-10">
                <Link 
                  href={`/${lang.id}/docs`} 
                  className="flex items-center justify-between p-4 bg-slate-50 text-slate-700 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all group/btn"
                >
                  <span className="flex items-center gap-2">
                    <Star size={18} className="group-hover/btn:fill-white" />
                    Top Resources
                  </span>
                  <ArrowRight size={18} className="opacity-0 group-hover/btn:opacity-100 -translate-x-2 group-hover/btn:translate-x-0 transition-all" />
                </Link>

                <Link 
                  href={`/${lang.id}/chat`} 
                  className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare size={18} />
                    Live Chat
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </Link>
              </div>

              {/* Decorative background element */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-blue-50 transition-colors -z-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <footer className="border-t border-slate-100 py-12 text-center text-slate-400 text-sm">
        <p>© 2025 Learn2Code Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}