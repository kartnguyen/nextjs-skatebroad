import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KarT | Blogs",
  description: "Generated by Thanh Nguyen",
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
