import type { ReactNode } from "react";

export default function GalleryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Page container */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
