"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "../store/cartStore";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = useCartStore((state) => state.items);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-end bg-slate-950/40 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="w-full max-w-md overflow-y-auto bg-white px-6 py-6 shadow-2xl sm:h-[90vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                  Your bag
                </p>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Cart summary
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-500 transition hover:text-slate-900"
              >
                Close
              </button>
            </div>

            {items.length === 0 ? (
              <div className="space-y-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
                <p className="text-lg font-semibold text-slate-900">
                  Your bag is empty
                </p>
                <p>Browse collections and add a product to start your order.</p>
                <Link
                  href="/"
                  className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="rounded-3xl border border-slate-200 p-4"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-20 w-20 rounded-3xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="font-semibold text-slate-950">
                                {item.product.title}
                              </p>
                              <p className="text-sm text-slate-500">
                                {item.selectedVariant}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="text-sm font-semibold text-primary transition hover:text-accent"
                              onClick={() => removeProduct(item.product.id)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-600">
                            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                  )
                                }
                                className="font-bold"
                              >
                                –
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                  )
                                }
                                className="font-bold"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-semibold text-slate-950">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-950">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                </div>

                <Link
                  href="/checkout"
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-4 text-sm font-semibold text-white transition hover:bg-accent"
                >
                  Proceed to checkout
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
