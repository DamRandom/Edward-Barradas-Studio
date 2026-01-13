"use client";

import { motion } from "framer-motion";

type PurchasePanelProps = {
  selectedCount: number;
  selectedTotal: number;
  fullPrice: number;
  discountedPrice: number;
  onBuySelected: () => void;
  onBuyFull: () => void;
};

export default function PurchasePanel({
  selectedCount,
  selectedTotal,
  fullPrice,
  discountedPrice,
  onBuySelected,
  onBuyFull,
}: PurchasePanelProps) {
  return (
    <motion.div
      className="
        w-full
        border-t border-black/10
        pt-10
        mt-14
      "
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left info */}
        <div className="space-y-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
              Selection
            </p>

            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-black">
              {selectedCount > 0
                ? `${selectedCount} photo${selectedCount > 1 ? "s" : ""} selected`
                : "No photos selected"}
            </p>
          </div>

          {selectedCount > 0 && (
            <p className="text-sm text-gray-700">
              Total:{" "}
              <span className="text-black uppercase tracking-wide">
                ${selectedTotal}
              </span>
            </p>
          )}
        </div>

        {/* Right actions */}
        <div className="space-y-6 text-right">
          {/* Buy selected */}
          <button
            disabled={selectedCount === 0}
            onClick={onBuySelected}
            className={`
              w-full
              md:w-auto
              inline-flex
              justify-center
              px-12 py-4
              border
              border-black
              text-xs
              uppercase
              tracking-[0.35em]
              transition
              ${
                selectedCount === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-black hover:text-white"
              }
            `}
          >
            Buy selected
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 justify-end">
            <span className="h-px w-12 bg-black/20" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
              or
            </span>
          </div>

          {/* Buy full collection */}
          <button
            onClick={onBuyFull}
            className="
              w-full
              md:w-auto
              inline-flex
              flex-col
              items-end
              gap-1
              px-12 py-4
              border
              border-black
              bg-black
              text-white
              text-xs
              uppercase
              tracking-[0.35em]
              hover:opacity-80
              transition
            "
          >
            <span>Buy full collection</span>
            <span className="text-[10px] tracking-widest text-white/70">
              ${discountedPrice} · instead of ${fullPrice}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
