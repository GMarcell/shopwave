"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "../types/product";
import type { Category } from "../lib/dummyjson";
import { useCartStore } from "../store/cartStore";
import CartDrawer from "./CartDrawer";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";

export default function ProductGallery({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const addProduct = useCartStore((state) => state.addProduct);
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesTerm =
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      return matchesTerm && matchesCategory;
    });
  }, [products, query, activeCategory]);

  return (
    <div className="main-shell">
      <Navbar onCartOpen={() => setDrawerOpen(true)} />
      <section className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-7">
          <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-soft">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                  Shopwave
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Modern fashion shopping with motion and polish.
                </h1>
                <p className="mt-4 max-w-[28rem] text-base leading-7 text-slate-600">
                  Explore curated products from DummyJSON, add them to a smart
                  cart drawer and proceed through a lightweight checkout
                  experience.
                </p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-slate-700 shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Cart preview
                </p>
                <p className="mt-3 text-4xl font-semibold text-slate-950">
                  {itemCount}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  items ready to buy
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 rounded-[36px] border border-slate-200 bg-white p-8 shadow-soft md:grid-cols-[1fr_0.8fr]">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                Search products
              </p>
              <label className="relative block">
                <input
                  aria-label="Search products"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by product name or description"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                Category filter
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === "all" ? "bg-primary text-white" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.slug}
                    onClick={() => setActiveCategory(category.slug)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category.slug ? "bg-primary text-white" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="section-heading">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Featured products
                </p>
                <h2 className="text-3xl font-semibold text-slate-950">
                  Browse the latest drops
                </h2>
              </div>
              <span className="small-badge">Powered by DummyJSON</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-[32px] border border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-600">
                <p className="text-lg font-semibold text-slate-950">
                  No products match that search.
                </p>
                <p className="mt-2">
                  Try a different keyword or reset the category filter.
                </p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={String(product.id)}
                    product={product}
                    onAdd={(item) => addProduct(item)}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>

        <aside className="space-y-6 rounded-[36px] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Motion-led experience
            </p>
            <h3 className="text-2xl font-semibold text-slate-950">
              Styled for polish and speed
            </h3>
            <p className="text-slate-600">
              The Shopwave storefront uses soft animation, a glassy interface,
              and a responsive product grid to feel like a modern brand website.
            </p>
          </div>
          <div className="grid gap-4 rounded-[28px] bg-slate-50 p-6 text-sm text-slate-600">
            <div className="flex items-center justify-between gap-3 text-slate-800">
              <span>Fast API loading</span>
              <span className="font-semibold">DummyJSON</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-slate-800">
              <span>Animated cards</span>
              <span className="font-semibold">Framer Motion</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-slate-800">
              <span>Client cart state</span>
              <span className="font-semibold">Zustand</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-slate-800">
              <span>Checkout flow</span>
              <span className="font-semibold">Next.js App Router</span>
            </div>
          </div>
        </aside>
      </section>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
