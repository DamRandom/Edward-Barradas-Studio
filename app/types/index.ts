// ─────────────────────────────────────────────────────────────────────────────
// Domain types — single source of truth for the entire application.
// Import from "@/app/types" everywhere; do NOT re-declare these inline.
// ─────────────────────────────────────────────────────────────────────────────

// ── Sanity CMS ───────────────────────────────────────────────────────────────

export interface SanityPhoto {
  url: string;
  date?: string;
  tags?: string[];
}

export interface SanityCollection {
  _id: string;
  name: string;
  publishedAt?: string;
  /** URL of the collection cover image (may be absent if no coverImage set in Sanity) */
  src?: string;
  photos?: SanityPhoto[];
}

export interface SanitySiteSettings {
  heroImage?: string;
  aboutPortrait?: string;
  aboutBackground?: string;
}

// ── UI / Feed ─────────────────────────────────────────────────────────────────

/** A single item in the masonry photo feed, derived from a SanityCollection. */
export interface FeedItem {
  id: string;
  url: string;
  title: string;
  date?: string;
  tags?: string[];
  collectionId?: string;
}

export interface InstagramPost {
  _id: string;
  image: string;
  url: string;
  likes: number;
  comments: number;
  reposts: number;
}
