"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle2, Circle, ArrowDown, BookOpen, MessageSquare } from 'lucide-react';
import { Button } from "@/components/Button";
import Link from 'next/link';

// --- ROADMAP DATA ---
const ROADMAP_DATA: Record<string, { title: string; steps: { id: number; task: string; desc: string }[] }> = {
  react: {
    title: "React Mastery Path",
    steps: [
      { id: 1, task: "JSX & Components", desc: "Understanding the building blocks of UI." },
      { id: 2, task: "Props & State", desc: "Managing data flow within your app." },
      { id: 3, task: "Hooks (useEffect/useState)", desc: "Functional component logic." },
      { id: 4, task: "API Integration", desc: "Fetching real-world data with Axios." }
    ]
  },
  java: {
    title: "Java Backend Path",
    steps: [
      { id: 1, task: "Syntax & Basics", desc: "Variables, loops, and data types." },
      { id: 2, task: "OOP Principles", desc: "Classes, Inheritance, and Interfaces." },
      { id: 3, task: "Spring Boot Intro", desc: "Setting up your first REST API." },
      { id: 4, task: "Database (JPA/Hibernate)", desc: "Connecting to SQL databases." }
    ]
  }
};

export default function RoadmapPage() {
  const { langId } = useParams();
  const lang = typeof langId === 'string' ? langId : 'react';
  const roadmap = ROADMAP_DATA[lang] || ROADMAP_DATA.react;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{roadmap.title}</h1>
          <p className="text-slate-500">Follow this path to become an expert in {lang}.</p>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-0">
          {roadmap.steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Vertical Line */}
              {index !== roadmap.steps.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-200" />
              )}

              <div className="flex gap-6 mb-12 relative z-10">
                <div className="bg-white border-2 border-blue-600 rounded-full w-12 h-12 flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-blue-600 font-bold">{step.id}</span>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.task}</h3>
                  <p className="text-slate-500 mb-4">{step.desc}</p>
                  
                  <div className="flex gap-2">
                    <Link href={`/${lang}/docs`}>
                      <Button className="bg-slate-100 text-slate-700 hover:bg-slate-200 py-2 text-xs h-auto shadow-none">
                        <BookOpen size={14} className="mr-1" /> View Docs
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Call to Action */}
        <div className="mt-12 bg-blue-600 rounded-3xl p-8 text-center text-white shadow-xl shadow-blue-200">
          <h2 className="text-2xl font-bold mb-2">Stuck on a step?</h2>
          <p className="mb-6 opacity-90">Our community is here to help you move forward.</p>
          <Link href={`/${lang}/chat`}>
            <Button className="bg-white text-blue-600 hover:bg-slate-100 px-8">
              Join the {lang} Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}