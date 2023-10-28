import { Breadcrumb } from "antd";
import Link from "next/link";

const Wishlist = () => {
  return (
    <section className="cart-page">
      <div className="container">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Home",
              href: "/",
            },
            {
              title: "Your Wishlist",
            },
          ]}
        />
      </div>
      <div className="no-results">
        <h1>You are not logged in!!!</h1>
        <p>
          Log in and create your wishlist <Link href={"/login"}>here</Link>.
        </p>
      </div>
    </section>
  );
};

export default Wishlist;
