import type { Metadata } from "next";

export const metadata = ({ params }: { params: { id: number } }): Metadata => {
  console.log(params);
  return {
    title: `KarT | `,
    description: "product.description",
  };
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
