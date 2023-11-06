import { Breadcrumb } from "antd";
import Link from "next/link";
import Skate3D from "@/app/_assets/components/Skate3D";

const Wishlist = () => {
  return (
    <section className="cart-page">
      <div className="container">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link href="/">Home</Link>,
            },
            {
              title: "About Us",
            },
          ]}
        />
      </div>
      <div className="no-results">
        <h1>This is our product 3d model</h1>
        <div
          className="spline-container"
          style={{ width: "100%", height: "70vh" }}
        >
          <Skate3D />
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
