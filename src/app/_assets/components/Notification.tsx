import { notification } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function Notification(product, qty) {
  notification.success({
    message: "Successful Purchase",
    description: (
      <div className="description-alert">
        <div
          className="alert-img"
          style={{ backgroundImage: `url('${product.thumbnail}')` }}
        ></div>
        <p>
          <b>{product.name} </b>
          <span> X {qty}</span>
        </p>
      </div>
    ),
    icon: (
      <ShoppingCartOutlined
        style={{
          color: "#00FF5F",
        }}
      />
    ),
    duration: 1,
  });
  notification.config({
    placement: "bottomRight",
    bottom: 50,
  });
}
