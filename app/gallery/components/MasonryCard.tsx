"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import type { FeedItem } from "@/app/types";

interface MasonryCardProps {
  item: FeedItem;
  onClick: () => void;
}

export default function MasonryCard({ item, onClick }: MasonryCardProps) {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Deterministic initial like count to avoid SSR hydration mismatches
  const initialLikes = useMemo(() => {
    if (!item.id) return 8;
    let hash = 0;
    for (let i = 0; i < item.id.length; i++) {
      hash = (hash << 5) - hash + item.id.charCodeAt(i);
      hash |= 0;
    }
    return (Math.abs(hash) % 14) + 3;
  }, [item.id]);

  const [likeCount, setLikeCount] = useState(initialLikes);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({ title: item.title, url: item.url });
      } else {
        await navigator.clipboard.writeText(item.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(item.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article
      onClick={onClick}
      className="break-inside-avoid mb-5 sm:mb-6 group relative bg-background border border-black/[0.06] overflow-hidden cursor-pointer transition-all duration-500 hover:border-black/20 hover:shadow-lg"
    >
      {/* Photo — natural aspect ratio via next/image width+height=responsive */}
      <div className="relative w-full overflow-hidden bg-black/5">
        <Image
          src={item.url}
          alt={item.title}
          width={800}
          height={1000}
          className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
        />

        {/* Quick actions on hover */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 bg-background/90 text-foreground text-xs rounded-full shadow-md hover:bg-foreground hover:text-background transition-all"
            title={copied ? "Copied!" : "Share photo"}
            aria-label="Share"
          >
            {copied ? "✓" : "↗"}
          </button>
        </div>
      </div>

      {/* Info & actions */}
      <div className="p-4 flex flex-col gap-2 bg-background">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-serif text-sm font-normal text-foreground group-hover:text-accent-gold transition-colors duration-300">
            {item.title}
          </h3>
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1 text-[10px] tracking-wider transition-colors duration-300 ${
              liked ? "text-red-500 font-medium" : "text-foreground/40 hover:text-foreground"
            }`}
            aria-label="Like"
          >
            <span>{liked ? "♥" : "♡"}</span>
            <span>{likeCount}</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-foreground/40">
          <span>{item.date ?? "Monograph"}</span>
          {item.tags && item.tags.length > 0 && (
            <div className="flex items-center gap-1 overflow-hidden">
              {item.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="hover:text-foreground transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
