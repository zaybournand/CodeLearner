"use client"
import { useParams } from "next/navigation";
import { Send, Users } from "lucide-react";

export default function ChatPage() {
  const { langId } = useParams();

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-64px)] flex flex-col p-4">
      <div className="bg-white border rounded-t-2xl p-4 flex justify-between items-center shadow-sm">
        <h2 className="text-xl font-bold capitalize">{langId} Community</h2>
        <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium">
          <Users size={16} /> 42 Online
        </div>
      </div>

      <div className="flex-1 bg-slate-50 border-x p-6 overflow-y-auto space-y-4">
        {/* Messages would go here */}
        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-md">
          <p className="text-xs font-bold text-blue-600 mb-1">SeniorDev_99</p>
          <p className="text-slate-700 text-sm">Welcome to the {langId} chat! Feel free to ask any questions.</p>
        </div>
      </div>

      <div className="bg-white border rounded-b-2xl p-4 shadow-sm">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder={`Message the ${langId} community...`}
            className="flex-1 bg-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}