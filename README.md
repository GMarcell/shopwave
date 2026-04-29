# Shopwave

Shopwave is a modern animated e-commerce storefront built with the latest Next.js App Router, Tailwind CSS, Framer Motion, Zustand, and Axios. Product data is loaded from the DummyJSON API and rendered into a polished shopping experience with cart state, product detail pages, and a checkout flow.

## Features

- **Next.js 15 App Router** with server-rendered product listing and dynamic routing
- **DummyJSON API integration** using Axios for fetching products and categories
- **Animated product cards and cart drawer** with Framer Motion for smooth interactions
- **Global cart state** managed with Zustand for persistent shopping cart
- **Responsive UI** with product search and category filtering
- **Product details page** with image gallery and variant selection
- **Mock checkout form** with shipping details and order summary
- **Tailwind CSS styling** with custom design system and modern e-commerce layout

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Axios
- **TypeScript**: Full type safety throughout
- **Image Optimization**: Next.js Image component

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

```
app/                    # Next.js App Router pages and layout
├── checkout/          # Checkout page
├── products/[id]/     # Dynamic product detail pages
├── globals.css        # Global styles
├── layout.tsx         # Root layout
└── page.tsx           # Home page

components/            # Reusable UI components
├── CartDrawer.tsx     # Shopping cart drawer
├── CheckoutForm.tsx   # Checkout form
├── Navbar.tsx         # Navigation header
├── ProductCard.tsx    # Product card component
├── ProductDetail.tsx  # Product detail view
└── ProductGallery.tsx # Product listing and filtering

lib/                   # Utilities and API helpers
├── axios.ts           # Axios client configuration
└── dummyjson.ts       # DummyJSON API functions

store/                 # State management
└── cartStore.ts       # Zustand cart store

types/                 # TypeScript type definitions
└── product.ts         # Product type definitions
```

## API Integration

The app integrates with [DummyJSON](https://dummyjson.com/) for product data:

- **Products**: Fetches product listings with images, pricing, and details
- **Categories**: Retrieves product categories for filtering
- **Images**: Uses CDN-hosted product images with Next.js optimization

## Notes

- This project uses DummyJSON as the product data source for demonstration purposes.
- The checkout flow is a mock implementation for UI demonstration only.
- The cart state is stored in memory and resets on page refresh.
- All images are optimized through Next.js Image component with proper domain configuration.
