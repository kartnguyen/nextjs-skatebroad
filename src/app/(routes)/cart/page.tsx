"use client";

import { Breadcrumb, Image, Modal, Table } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, update } from "@/app/_assets/redux/features/cart/cartSlice";
import { RootState } from "@/app/_assets/redux/store";
import { formattedPrice } from "@/app/_assets/libs";
import Link from "next/link";
import type { ColumnsType } from "antd/es/table";

const Cart: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string>("");
  const dispatch = useDispatch();
  const cartState = useSelector((state: RootState) => state.cart);

  let totalPrice = 0;

  for (let i = 0; i < cartState.items.length; i++) {
    const item = cartState.items[i];
    totalPrice += item.product.price * item.quantity;
  }

  const handleQuantity = (
    type: "minus" | "plus",
    params: { productId: string; quantity: number }
  ) => {
    let currentQuantity = params.quantity;
    if (type === "minus") {
      if (params.quantity > 1) {
        currentQuantity = params.quantity - 1;
        dispatch(
          update({ productId: params.productId, quantity: currentQuantity })
        );
      } else {
        document
          .querySelector(`.id_${params.productId}`)
          ?.classList.add("disabled");
      }
    } else if (type === "plus") {
      currentQuantity = params.quantity + 1;
      dispatch(
        update({ productId: params.productId, quantity: currentQuantity })
      );
      document
        .querySelector(`.id_${params.productId}`)
        ?.classList.remove("disabled");
    }
  };

  const items = cartState.items;

  interface DataType {
    key: React.Key;
    name: string;
    price: number;
    quantity: number;
    img: string;
    total: number;
  }

  const dataSource = items.map((item) => ({
    key: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    img: item.product.thumbnail,
    total: item.product.price * item.quantity,
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div className="cart-table">
          <Image src={record.img} width={100} alt="" />
          <Link href={`/products/${record.key}`}>
            <b>{record.name}</b>
          </Link>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_: any, record: any) => formattedPrice(record.price),
      responsive: ["md"],
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_: any, record: any) => (
        <>
          <div className="js-qty">
            <button
              className={`qty_minus id_${record.key}`}
              onClick={() =>
                handleQuantity("minus", {
                  productId: record.key,
                  quantity: record.quantity,
                })
              }
            >
              <CaretDownOutlined />
            </button>
            <span className="qty-input">{record.quantity}</span>
            <button
              className="qty_plus"
              onClick={() =>
                handleQuantity("plus", {
                  productId: record.key,
                  quantity: record.quantity,
                })
              }
            >
              <CaretUpOutlined />
            </button>
          </div>
        </>
      ),
      key: "quantity",
      width: 100,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_: any, record: any) => formattedPrice(record.total),
      width: 100,
    },
    {
      title: "Delete",
      key: "id",
      render: (_: any, record: any) => (
        <DeleteOutlined
          style={{ fontSize: "20px", color: "#444" }}
          onClick={() => showModal(record.key)}
        />
      ),
      width: 80,
    },
  ];

  const showModal = (id: string) => {
    setOpen(true);
    setCurrentId(id);
  };

  const handleOk = () => {
    dispatch(remove({ productId: currentId }));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <section className="cart-page">
      <Modal
        title="Delete?"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you want to remove this product?</p>
      </Modal>
      <div className="container">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link href="/">Home</Link>,
            },
            {
              title: "Your Shopping Cart",
            },
          ]}
        />
        {cartState.items.length != 0 ? (
          <div className="cart-products">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              bordered
              size="small"
            />
            <div className="check-out">
              <div className="total">
                <h4>Total</h4>
                <b>{formattedPrice(totalPrice)}</b>
              </div>
              <Link href="/checkout">
                <button className="check-out-btn submit">
                  Proceed to checkout
                  <div className="triangle-top-right" />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="no-results">
            <h1>Your cart is empty!!!</h1>
            <p>
              Continue browsing{" "}
              <Link href="/products">
                <span style={{ textDecoration: "underline" }}>here</span>
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
