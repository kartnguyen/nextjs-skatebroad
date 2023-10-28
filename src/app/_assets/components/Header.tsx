"use client";

import {
  BarsOutlined,
  HeartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  // const { totalItems } = useCartContext();
  const totalItems = 1;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <header className={`${fixed ? "fixed-top" : ""}`}>
      <div className="container">
        <div className="header">
          <div className="nav-mobile">
            <BarsOutlined onClick={showDrawer} />
            <Drawer
              placement="left"
              onClose={onClose}
              width={300}
              title="Menu"
              open={open}
            >
              <div className="nav-bar-mobile">
                <Link href="/" onClick={onClose}>
                  <img src="/kart.svg" alt="logo" />
                </Link>
                <Link
                  className={`nav-item ${pathname === "/" ? "active" : ""}`}
                  href={"/"}
                  onClick={onClose}
                >
                  Home
                </Link>
                <Link
                  className={`nav-item ${
                    pathname === "/products" ? "active" : ""
                  }`}
                  href={"/products"}
                  onClick={onClose}
                >
                  Products
                </Link>
                <Link
                  className={`nav-item ${pathname === "/blog" ? "active" : ""}`}
                  href={"/blog"}
                  onClick={onClose}
                >
                  Blog
                </Link>
              </div>
            </Drawer>
          </div>
          <div className="logo">
            <Link href="/">
              <img src="/kart.svg" alt="logo" />
            </Link>
          </div>
          <div className="nav-bar">
            <Link
              className={`nav-item ${pathname === "/" ? "active" : ""}`}
              href={"/"}
            >
              Home
            </Link>
            <Link
              className={`nav-item ${pathname === "/products" ? "active" : ""}`}
              href={"/products"}
            >
              Products
            </Link>
            <Link
              className={`nav-item ${pathname === "/blog" ? "active" : ""}`}
              href={"/blog"}
            >
              Blog
            </Link>
          </div>
          <div className="action">
            <div className="login">
              <Link
                href="/wishlist"
                className={pathname === "/wishlist" ? "active" : ""}
              >
                <HeartOutlined />
              </Link>
              <Link
                href="/login"
                className={pathname === "/login" ? "active" : ""}
              >
                <UserOutlined />
              </Link>
            </div>
            <div className="cart">
              <Link
                href="/cart"
                className={pathname === "/cart" ? "active" : ""}
              >
                <ShoppingOutlined />
                {totalItems ? (
                  <span className="cart-quantity">{totalItems}</span>
                ) : (
                  ""
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
