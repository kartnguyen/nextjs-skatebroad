import { Providers } from "@/app/_assets/redux/provider";
import BackToTop from "../_assets/components/BackToTop";
import Footer from "../_assets/components/Footer";
import Header from "../_assets/components/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </Providers>
    </>
  );
}
