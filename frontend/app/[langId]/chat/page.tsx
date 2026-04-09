"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { Send, Users, Loader2, UserCircle, ArrowLeft } from "lucide-react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import { API_URL } from "@/app/utils/api";
import { useAuth } from "@/app/Auth";

interface ChatMessage {
  id?: number;
  message: string; 
  sender: string;
  topic: string;
  timestamp?: string;
}
axios.defaults.withCredentials = true;

export default function ChatPage() {
  const params = useParams();
  const langId = (params.langId as string).toLowerCase();
  const router = useRouter();

  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  
  const stompClientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleGoBack = () => {
    router.push("/");
  }

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/chat/${langId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching chat:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);  
    fetchMessages(); 
    const socket = new SockJS(`${API_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {       
      },
      onConnect: () => {
        console.log("Connected to Live Chat!");
        
        client.subscribe(`/topic/messages/${langId}`, (msg) => {
          const incomingMessage = JSON.parse(msg.body);
          setMessages((prev) => [...prev, incomingMessage]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [langId]); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !user) return;

    const senderName = user.username || user.email;

    const newMessage = {
      message: inputText, 
      sender: senderName,
    };

    if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.publish({
            destination: `/app/sendMessage/${langId}`,
            body: JSON.stringify(newMessage)
        });
        
        setInputText(""); 
    } else {
        console.error("Cannot send: WebSocket is not connected.");
    }
  };
 
  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-64px)] flex flex-col p-4 font-sans text-slate-800">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-t-2xl p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
            <button 
              onClick={handleGoBack}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors"
              title="Return Home"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
                <h2 className="text-xl font-bold capitalize flex items-center gap-2">
                    {langId} Community
                </h2>
                <p className="text-xs text-slate-400">Topic: {langId}</p>
            </div>
        </div>

        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm font-bold border border-emerald-100">
          <Users size={16} /> Live
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-slate-50/50 border-x border-slate-200 p-6 overflow-y-auto space-y-4">
        {loading && (
            <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-blue-600" />
            </div>
        )}

        {!loading && messages.length === 0 && (
            <div className="text-center py-10 text-slate-400">
                <p>No messages yet. Be the first to say hello!</p>
            </div>
        )}

        {messages.map((msg, index) => {
          const senderName = user?.username || user?.email;
          const isMe = msg.sender === senderName;
          
          return (
            <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className="flex items-center gap-2 mb-1">
                        {!isMe && <UserCircle size={14} className="text-slate-400" />}
                        <span className="text-xs font-bold text-slate-500">
                            {msg.sender}
                        </span>
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                        isMe 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                    }`}>
                        {msg.message} 
                    </div>
                </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border border-slate-200 rounded-b-2xl p-4 shadow-sm">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={user ? `Message the ${langId} community...` : "Please log in to chat"}
            disabled={!user}
            className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={!user || !inputText.trim()}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none active:scale-95"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}