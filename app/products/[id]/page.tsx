import { getProduct } from "../../../lib/dummyjson";
import ProductDetail from "../../../components/ProductDetail";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  return <ProductDetail product={product} />;
}
