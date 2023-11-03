import { IProduct } from "@/app/_assets/types/product";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const products = await fetch(
    `https://651a276d340309952f0ce8ff.mockapi.io/skates`
  ).then((res) => res.json());

  const product = products.find((product: IProduct) => product.id == id);

  return {
    title: `KarT | ${product.name}`,
    description: product.description,
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
