# Shopwave

Shopwave is a modern animated e-commerce storefront built with the latest Next.js App Router, Tailwind CSS, Framer Motion, Zustand, and Axios. Product data is loaded from the DummyJSON API and rendered into a polished shopping experience with cart state, product detail pages, and a checkout flow.

## Features

- Next.js 15 App Router with server-rendered product listing
- DummyJSON API integration using Axios
- Animated product cards and cart drawer with Framer Motion
- Global cart state managed with Zustand
- Responsive UI and product search/filtering
- Product details page and mock checkout form
- Tailwind CSS styling and modern e-commerce layout

## Project setup

```bash
cd /home/admin-ubuntu/grand/shopwave
npm install
npm run dev
```

Open `http://localhost:3000` to view the app.

## Available scripts

- `npm run dev` - start the Next.js development server
- `npm run build` - build the production app
- `npm start` - start the production server after building
- `npm run typecheck` - run TypeScript type checking

## Folder structure

- `app/` - Next.js App Router pages and layout
- `components/` - reusable UI components
- `lib/` - Axios client and DummyJSON API helpers
- `store/` - Zustand cart state
- `types/` - TypeScript product types

## Notes

- This project uses DummyJSON as the product data source.
- The checkout flow is a mock implementation for UI demonstration.
- The cart is stored in memory and resets on page refresh.
