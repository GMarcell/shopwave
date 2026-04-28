"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "../store/cartStore";
import Link from "next/link";

export default function CheckoutForm() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });

  const total = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitted");
    clearCart();
  };

  if (items.length === 0 && status !== "submitted") {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-soft">
        <p className="text-lg font-semibold text-slate-950">
          Your bag is empty.
        </p>
        <p className="mt-3 text-slate-600">
          Add items in the store before checking out.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  if (status === "submitted") {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-soft">
        <p className="text-xl font-semibold text-slate-950">Order received.</p>
        <p className="mt-3 text-slate-600">
          Thanks for shopping with Shopwave. Your mock order will be processed
          instantly.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent"
        >
          Return home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Checkout
          </p>
          <h1 className="text-3xl font-semibold text-slate-950">
            Complete your purchase
          </h1>
          <p className="text-slate-600">
            Fill in your shipping details and place a mock order. This checkout
            page is built to reflect an end-to-end funnel.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-6 sm:grid-cols-2"
        >
          {[
            { name: "name", label: "Full name" },
            { name: "email", label: "Email address" },
            { name: "address", label: "Shipping address", full: true },
            { name: "city", label: "City" },
            { name: "country", label: "Country" },
          ].map((field) => (
            <label
              key={field.name}
              className={field.full ? "sm:col-span-2 block" : "block"}
            >
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                {field.label}
              </span>
              <input
                value={fields[field.name as keyof typeof fields]}
                onChange={(event) =>
                  setFields({ ...fields, [field.name]: event.target.value })
                }
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          ))}

          <div className="sm:col-span-2 rounded-[32px] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Items</span>
              <span>{items.length}</span>
            </div>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-4 text-sm text-slate-700"
                >
                  <span>
                    {item.product.title} × {item.quantity}
                  </span>
                  <span className="font-semibold text-slate-950">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-slate-950">
              <span className="font-semibold">Order total</span>
              <span className="text-lg font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="sm:col-span-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-semibold text-white transition hover:bg-accent"
          >
            Place order
          </button>
        </form>
      </div>
    </div>
  );
}
