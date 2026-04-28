"use client";

import Link from "next/link";
import { useCartStore } from "../store/cartStore";

export default function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <header className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-slate-200 bg-white/90 px-6 py-5 shadow-soft backdrop-blur-xl">
      <div>
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight text-slate-950"
        >
          Shopwave
        </Link>
        <p className="mt-1 text-sm text-slate-500">
          Animated e-commerce storefront
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/checkout"
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
        >
          Checkout
        </Link>
        <button
          type="button"
          onClick={onCartOpen}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/10 transition hover:bg-accent"
        >
          <span>Bag</span>
          <span className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-white/95 text-sm font-bold text-slate-950">
            {itemCount}
          </span>
        </button>
      </div>
    </header>
  );
}
