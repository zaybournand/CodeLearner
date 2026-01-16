"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation'; // In your local VS Code, this works.
import { Book, ChevronRight, Menu, Code } from 'lucide-react';

// --- 1. THE DATA (The "Database" for your docs) ---
// In a real app, you might move this to a separate JSON file or fetch it from your Spring Boot API.
const DOCS_DATA: any = {
  react: {
    title: "React Documentation",
    color: "text-sky-500",
    sections: [
      {
        id: "intro",
        title: "Introduction",
        content: "React is a library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components'.",
        code: `function HelloWorld() {\n  return <h1>Hello, World!</h1>;\n}`
      },
      {
        id: "hooks",
        title: "Understanding Hooks",
        content: "Hooks allow you to use state and other React features without writing a class. The most common hooks are useState and useEffect.",
        code: `const [count, setCount] = useState(0);`
      }
    ]
  },
  java: {
    title: "Java Masterclass",
    color: "text-red-500",
    sections: [
      {
        id: "basics",
        title: "Java Basics",
        content: "Java is a class-based, object-oriented programming language. It is designed to have as few implementation dependencies as possible.",
        code: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello Java");\n  }\n}`
      },
      {
        id: "oop",
        title: "OOP Principles",
        content: "Java relies heavily on Inheritance, Encapsulation, Polymorphism, and Abstraction.",
        code: `class Animal {\n  void bark() {\n    System.out.println("Woof");\n  }\n}`
      }
    ]
  },
  // Default fallback if language doesn't exist
  default: {
    title: "Coming Soon",
    color: "text-slate-500",
    sections: [
      {
        id: "404",
        title: "Under Construction",
        content: "We haven't written the docs for this language yet. Check back later!",
        code: null
      }
    ]
  }
};

export default function DocsPage() {
  // 1. Get the language from the URL (e.g., 'java')
  const params = useParams();
  const langId = (params.langId as string)?.toLowerCase() || 'react';

  // 2. Select the data based on the language
  const currentDocs = DOCS_DATA[langId] || DOCS_DATA['default'];
  
  // 3. State for the currently selected section (default to the first one)
  const [activeSection, setActiveSection] = useState(currentDocs.sections[0]);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* --- LEFT SIDEBAR (Navigation) --- */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full pt-20">
        <div className="p-6">
          <h2 className={`text-2xl font-extrabold ${currentDocs.color} mb-6 capitalize`}>
            {langId} Docs
          </h2>
          <nav className="space-y-1">
            {currentDocs.sections.map((section: any) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between group ${
                  activeSection.id === section.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {section.title}
                {activeSection.id === section.id && <ChevronRight size={16} />}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 md:ml-64 pt-20 p-8 max-w-4xl">
        
        {/* Mobile Header (Only shows on small screens) */}
        <div className="md:hidden mb-8 flex items-center gap-2 text-slate-500">
          <Menu size={20} />
          <span className="font-bold text-slate-900">Table of Contents</span>
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
              <Book size={24} />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900">
              {activeSection.title}
            </h1>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {activeSection.content}
            </p>

            {/* Code Block */}
            {activeSection.code && (
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl my-8 border border-slate-800">
                <div className="bg-slate-800/50 px-4 py-2 flex items-center justify-between border-b border-white/10">
                  <span className="text-xs font-mono text-slate-400">Example Code</span>
                  <Code size={14} className="text-slate-500" />
                </div>
                <pre className="p-6 overflow-x-auto">
                  <code className="font-mono text-sm text-blue-300">
                    {activeSection.code}
                  </code>
                </pre>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between">
            <button className="text-slate-400 font-medium hover:text-blue-600 transition-colors">
              &larr; Previous
            </button>
            <button className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
              Next Lesson &rarr;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}