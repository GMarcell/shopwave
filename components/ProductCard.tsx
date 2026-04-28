"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "../types/product";

const variantLabels = ["Noir", "Blush", "Ivory", "Clay"];

type Props = {
  product: Product;
  onAdd: (product: Product) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  const [wishlist, setWishlist] = useState(false);
  const discount = Math.round(product.discountPercentage);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft"
    >
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={520}
            height={520}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          type="button"
          onClick={() => setWishlist((value) => !value)}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm transition hover:bg-slate-100"
          aria-label="Toggle wishlist"
        >
          <span
            className={`text-xl transition ${wishlist ? "text-accent" : "text-slate-400"}`}
          >
            {wishlist ? "♥" : "♡"}
          </span>
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-slate-200 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-500">
            {product.category}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {product.rating.toFixed(1)} ★
          </span>
        </div>

        <div className="space-y-2">
          <Link
            href={`/products/${product.id}`}
            className="block text-lg font-semibold text-slate-950 transition hover:text-primary"
          >
            {product.title}
          </Link>
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">Starting at</p>
            <p className="text-xl font-semibold text-slate-950">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="text-right text-sm text-slate-500">
            <p>{discount}% off</p>
            <p className="text-slate-400">{product.stock} in stock</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {variantLabels.slice(0, 3).map((variant) => (
            <span
              key={variant}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-600"
            >
              {variant}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onAdd(product)}
          className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent"
        >
          Add to bag
        </button>
      </div>
    </motion.article>
  );
}
