import { Provider } from "react-redux";
import BackToTop from "../_assets/components/BackToTop";
import Footer from "../_assets/components/Footer";
import Header from "../_assets/components/Header";
import { store } from "@/app/_assets/redux/store";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider store={store}>
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </Provider>
    </>
  );
}
