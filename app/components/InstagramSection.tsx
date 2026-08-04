"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { InstagramPost } from "@/app/types";

interface InstagramSectionProps {
  posts: InstagramPost[];
}

// Custom icons for the overlay stats
const HeartIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const CommentIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
  </svg>
);

const RepostIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" />
  </svg>
);

export default function InstagramSection({ posts }: InstagramSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-24 md:py-36 bg-background border-t border-black/6">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.45em] text-foreground/40 font-medium block mb-3">
              Social / IG
            </span>
            <h2 className="font-serif font-light text-[clamp(2.4rem,4.5vw,3.6rem)] text-foreground leading-none">
              Diario de Instagram
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-accent-gold" />
            <a
              href="https://instagram.com/edwardbarradas"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 hover:text-foreground transition-colors"
            >
              @edwardbarradas
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <motion.a
              key={post._id}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="group block"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="relative w-full aspect-square overflow-hidden bg-foreground/5 mb-3">
                <Image
                  src={post.image}
                  alt="Instagram post"
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                />
              </div>

              {/* Stats below image */}
              <div className="flex items-center gap-5 text-foreground/60 group-hover:text-foreground transition-colors duration-300">
                <div className="flex items-center gap-1.5">
                  <HeartIcon />
                  <span className="text-[10px] font-medium tracking-wide">
                    {post.likes.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CommentIcon />
                  <span className="text-[10px] font-medium tracking-wide">
                    {post.comments.toLocaleString()}
                  </span>
                </div>
                {post.reposts > 0 && (
                  <div className="flex items-center gap-1.5">
                    <RepostIcon />
                    <span className="text-[10px] font-medium tracking-wide">
                      {post.reposts.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
