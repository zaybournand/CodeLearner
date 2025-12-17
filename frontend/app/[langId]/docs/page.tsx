"use client"
import { useParams } from "next/navigation";
import { Star, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

const MOCK_DOCS = [
  { title: "Official Documentation", rating: 5.0, reviews: 1200, url: "#" },
  { title: "Community Wiki", rating: 4.2, reviews: 85, url: "#" },
  { title: "Interactive Course", rating: 4.8, reviews: 450, url: "#" },
];

export default function DocsPage() {
  const { langId } = useParams();
  
  // Sort: Best Rating first
  const sortedDocs = [...MOCK_DOCS].sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link href="/" className="text-slate-500 hover:text-blue-600 flex items-center gap-2 mb-6">
        <ArrowLeft size={16} /> Back to Languages
      </Link>
      
      <h1 className="text-4xl font-bold capitalize mb-2">{langId} Resources</h1>
      <p className="text-slate-500 mb-8">Top-rated documentation sorted by community reviews.</p>

      <div className="space-y-4">
        {sortedDocs.map((doc, i) => (
          <div key={i} className="bg-white border rounded-2xl p-6 flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-lg font-bold">{doc.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{doc.rating}</span>
                <span className="text-slate-400 text-sm">({doc.reviews} reviews)</span>
              </div>
            </div>
            <a href={doc.url} className="p-3 bg-slate-100 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
              <ExternalLink size={20} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}