import { api } from "./axios";
import type { Product } from "../types/product";

export type Category = {
  slug: string;
  name: string;
  url: string;
};

export async function getProducts(limit = 24): Promise<Product[]> {
  const response = await api.get<{ products: Product[] }>(
    `/products?limit=${limit}`,
  );
  return response.data.products;
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/products/categories");
  return Array.isArray(response.data) ? response.data : [];
}

export async function getProduct(id: string): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}
