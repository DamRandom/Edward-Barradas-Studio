// ─────────────────────────────────────────────────────────────────────────────
// Server-side data fetching — single source of truth for Sanity calls.
// Import from "@/app/lib/data" in page components.
// All functions run only on the server (no "use client").
// ─────────────────────────────────────────────────────────────────────────────

import { client } from "@/sanity/lib/client";
import {
  recentTwoCollectionsQuery,
  myChoiceQuery,
  recentCollectionsQuery,
  siteSettingsQuery,
  allCollectionsQuery,
  instagramPostsQuery,
} from "@/sanity/lib/queries";
import type { SanityCollection, SanitySiteSettings, InstagramPost } from "@/app/types";

// ── Home Page Data ────────────────────────────────────────────────────────────

interface HomeData {
  collections: SanityCollection[];
  siteSettings: SanitySiteSettings;
  instagramPosts: InstagramPost[];
}

/**
 * Fetches all data needed for the home page.
 *
 * Strategy: Display 2 most-recent collections + the "My Choice" collection
 * as the 3rd slot. If "My Choice" does not exist yet, fall back to top-3
 * most-recent collections.
 */
export async function fetchHomeData(): Promise<HomeData> {
  const [twoRecent, myChoiceCollection, rawSettings, instagramPosts] = await Promise.all([
    client.fetch<SanityCollection[]>(
      recentTwoCollectionsQuery,
      {},
      { next: { tags: ["collection"] } }
    ),
    client.fetch<SanityCollection | null>(
      myChoiceQuery,
      {},
      { next: { tags: ["collection"] } }
    ),
    client.fetch<SanitySiteSettings | null>(
      siteSettingsQuery,
      {},
      { next: { tags: ["siteSettings"] } }
    ),
    client.fetch<InstagramPost[]>(
      instagramPostsQuery,
      {},
      { next: { tags: ["instagramPost"] } }
    ),
  ]);

  const siteSettings: SanitySiteSettings = rawSettings ?? {};

  let collections: SanityCollection[] = [...(twoRecent ?? [])];

  if (myChoiceCollection) {
    collections.push(myChoiceCollection);
  } else {
    // Fallback: top-3 most-recent when "My Choice" collection doesn't exist
    const fallback = await client.fetch<SanityCollection[]>(
      recentCollectionsQuery,
      {},
      { next: { tags: ["collection"] } }
    );
    collections = fallback ?? [];
  }

  return { collections, siteSettings, instagramPosts: instagramPosts ?? [] };
}

// ── Gallery Page Data ─────────────────────────────────────────────────────────

/**
 * Fetches all collections for the gallery page, ordered by most recent.
 */
export async function fetchGalleryData(): Promise<SanityCollection[]> {
  const collections = await client.fetch<SanityCollection[]>(
    allCollectionsQuery,
    {},
    { next: { tags: ["collection"] } }
  );
  return collections ?? [];
}
