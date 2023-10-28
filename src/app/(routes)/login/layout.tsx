import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KarT | Login",
  description: "Generated by Thanh Nguyen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}