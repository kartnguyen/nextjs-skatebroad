"use client";

import ProductServices from "@/app/_assets/services/products.services";
import { IProduct } from "@/app/_assets/types/product";

export default function Page({ params }: { params: { id: number } }) {
  const { products } = ProductServices();
  if (products) {
    const p = products.result;
    console.log(p);
    const product = p.find((product: IProduct) => product.id === params.id);
    console.log(product);
  }
  return <div>My Post: {params.id}</div>;
}
