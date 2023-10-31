import ProductServices from "@/app/_assets/services/products.services";

export default function Page({ params }: { params: { id: number } }) {
  const { findProductById } = ProductServices();
  const product = findProductById(params.id);
  return <div>My Post: {product.id}</div>;
}
