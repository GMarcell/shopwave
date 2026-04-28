import { api } from "./axios";
import type { Product } from "../types/product";

export async function getProducts(limit = 24): Promise<Product[]> {
  const response = await api.get<{ products: Product[] }>(
    `/products?limit=${limit}`,
  );
  return response.data.products;
}

export async function getCategories(): Promise<string[]> {
  const response = await api.get<string[]>("/products/categories");
  return response.data;
}

export async function getProduct(id: string): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}
