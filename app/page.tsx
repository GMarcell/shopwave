import { getCategories, getProducts } from "../lib/dummyjson";
import ProductGallery from "../components/ProductGallery";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <ProductGallery products={products} categories={categories} />;
}
