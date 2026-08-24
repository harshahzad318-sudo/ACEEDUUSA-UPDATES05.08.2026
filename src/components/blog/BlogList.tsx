/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";

interface BlogPost {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  date: string;
  image?: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search 50+ SEO articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 focus:border-gold focus:outline-none text-navy text-sm transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-gold border-gold text-navy shadow-md shadow-gold/15"
                    : "bg-[#F8F9FC] border-gray-100 text-gray-500 hover:border-gold/30 hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <Link
                key={i}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden card-hover group flex flex-col justify-between h-full border border-gray-100/60 shadow-sm hover:shadow-md hover:border-gold/20 transition-all"
              >
                <div>
                  <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#0D2073]/10 to-gold/10">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-navy/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider">{post.category}</span>
                    <h2 className="font-bold text-navy mt-2 group-hover:text-gold-dark transition-colors leading-snug text-base line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="text-xs text-gray-400 border-t border-gray-50 pt-4">{post.date}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-navy">No articles found</h3>
            <p className="text-sm text-gray-500 mt-2">Try adjusting your search query or selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
