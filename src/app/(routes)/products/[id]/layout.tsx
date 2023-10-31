import ProductServices from "@/app/_assets/services/products.services";
import type { Metadata } from "next";

// const { findProductById() } = ProductServices();
// console.log(findProductById);

type ProductDetailProps = {
  params: {
    id: number;
  };
};

// export const metadata = ({ params: { id } }: ProductDetailProps): Metadata => {
//   console.log(id);
//   // const product = findProductById(id);
//   console.log(product);

//   return {
//     title: `KarT | ${product.title}`,
//     description: product.description,
//   };
// };

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
