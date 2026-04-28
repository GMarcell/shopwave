"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types/product";

const variantOptions = ["Noir", "Blush", "Ivory", "Clay"];

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const [variant, setVariant] = useState(variantOptions[0]);
  const addProduct = useCartStore((state) => state.addProduct);

  const price = useMemo(() => product.price.toFixed(2), [product.price]);

  return (
    <div className="main-shell">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8 rounded-[36px] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="grid gap-4 sm:grid-cols-[1fr_0.95fr]">
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 p-4">
              <Image src={product.images[0]} alt={product.title} width={900} height={700} className="h-full w-full rounded-[28px] object-cover" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{product.brand}</p>
                <h1 className="text-4xl font-semibold text-slate-950">{product.title}</h1>
                <p className="text-lg text-slate-600">{product.category}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2">{product.stock} in stock</span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2">{product.rating.toFixed(1)} ★</span>
              </div>
              <p className="text-slate-600 leading-7">{product.description}</p>
            </div>
          </div>

          <div className="grid gap-6 rounded-[32px] border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Price</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">${price}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Select color</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {variantOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setVariant(option)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${variant === option ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => addProduct(product)}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-semibold text-white transition hover:bg-accent"
            >
              Add to bag
            </button>
          </div>
        </div>

        <aside className="space-y-6 rounded-[36px] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">More photos</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {product.images.slice(1, 5).map((image) => (
                <div key={image} className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100">
                  <Image src={image} alt={product.title} width={360} height={240} className="h-36 w-full object-cover transition duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          <motion.div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Why Shopwave</p>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li className="before:mr-2 before:inline-block before:text-primary before:content-["•"]">Motion-led product browsing</li>
              <li className="before:mr-2 before:inline-block before:text-primary before:content-["•"]">Built with Next.js App Router</li>
              <li className="before:mr-2 before:inline-block before:text-primary before:content-["•"]">Client cart state using Zustand</li>
            </ul>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}
