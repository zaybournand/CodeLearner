"use client" 

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { Button } from "@/components/Button";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">CodeLearner</span>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {/* Ensure this is a Link around the button */}
              <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                Sign In
              </Link>
              
              <Link href="/signup">
                <Button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-500 shadow-md transition-all">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </nav>
        
        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}