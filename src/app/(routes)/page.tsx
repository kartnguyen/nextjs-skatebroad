"use client";

import { Button, Col, Flex, Row, Space, Typography, message } from "antd";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  ShoppingOutlined,
  SearchOutlined,
  HeartOutlined,
  MailOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { formattedPrice } from "../_assets/libs";
import Rated from "../_assets/components/Rated";
import ProductServices from "../_assets/services/products.services";
import Loader from "../_assets/components/Loader";
import { IProduct } from "../_assets/types/product";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import Notification from "../_assets/components/Notification";
import { useSelector, useDispatch } from "react-redux";
import {
  CartState,
  add,
  remove,
  update,
} from "../_assets/redux/features/cart/cartSlice";

const Home = () => {
  const [showImage, setShowImage] = useState<boolean>(false);
  const [currentImg, setCurrentImg] = useState<string>("");
  const [currentFilter, setCurrentFilter] = useState<string>("Featured");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { products, isLoading } = ProductServices();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const key = "updatable";
  const dispatch = useDispatch();

  const items = products ? products.result : null;

  const filteredProducts = () => {
    return items.filter((product: IProduct) => {
      if (currentFilter === "Featured") {
        return product.category === "Featured";
      } else if (currentFilter === "Top Seller") {
        return product.category === "Top Seller";
      } else if (currentFilter === "Latest") {
        return product.category === "Latest";
      }
      return true;
    });
  };
  const handleFilter = (params: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentFilter(params);
    }, 500);
  };

  const handleQuickview = (id: string) => {
    const pro = items.find((product: IProduct) => product.id === id);
    setCurrentImg(pro.images);
    document.body.classList.add("overflow-hidden");
    setShowImage(true);
  };
  const handleCloseImg = () => {
    setShowImage(false);
    document.body.classList.remove("overflow-hidden");
  };

  const openMessage = (data: any) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: (
          <span>
            Thanks <span style={{ color: "#ff7245" }}>{data.email}</span> for
            subscribe!
          </span>
        ),
        duration: 2.5,
      });
      reset({ email: "" });
    }, 1000);
  };

  const onAddItem = (product: IProduct) => {
    Notification(product, 1);
    dispatch(add({ product: product, quantity: 1 }));
  };
  if (isLoading) return <Loader />;
  if (!products) return null;
  return (
    <div className="home">
      <section className="slider-container">
        <MDBCarousel showControls showIndicators fade dark>
          <div className="slider">
            <MDBCarouselItem
              className="w-100 d-block"
              itemId={1}
              src="/products/slide_h4_1.jpg"
              alt="..."
            >
              <div className="container">
                <div className="text-slider text-1">
                  <Typography.Title level={4}>NEW COLLECTION</Typography.Title>
                  <Typography.Title
                    level={1}
                    className="animated infinite flash"
                    style={{ fontWeight: 700 }}
                  >
                    Summer <br /> Skatefest
                  </Typography.Title>
                  <p>
                    A team of 5 experienced judges will decide <br /> the
                    winners through a scoring system
                  </p>
                  <Link href={"/products"}>
                    <button className="btn-btn">SHOP NOW</button>
                  </Link>
                </div>
              </div>
            </MDBCarouselItem>
          </div>
          <div className="slider">
            <MDBCarouselItem
              className="w-100 d-block"
              itemId={2}
              src="/products/slide_h4_2.jpg"
              alt="..."
            >
              <div className="container">
                <div className="text-slider text-2">
                  <Typography.Title level={4}>NEW COLLECTION</Typography.Title>
                  <Typography.Title
                    level={1}
                    className="animated infinite flash"
                    style={{ fontWeight: 700 }}
                  >
                    Go Skate <br /> Boarding day
                  </Typography.Title>
                  <p>
                    A team of 5 experienced judges will decide <br /> the
                    winners through a scoring system
                  </p>
                  <Link href={"/products"}>
                    <button className="btn-btn">SHOP NOW</button>
                  </Link>
                </div>
              </div>
            </MDBCarouselItem>
          </div>
        </MDBCarousel>
      </section>
      <section className="section-service">
        <div className="container">
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col span={8} className="service-item">
              <div className="box-service">
                <div className="service-wrap">
                  <div className="box-icon">
                    <div className="icon">
                      <svg
                        width={55}
                        height={56}
                        viewBox="0 0 55 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1338_28731)">
                          <path
                            d="M5.11543 5.72032C5.11543 5.24573 5.50021 4.86095 5.9748 4.86095H17.4626C17.9372 4.86095 18.322 5.24573 18.322 5.72032C18.322 6.19491 17.9372 6.5797 17.4626 6.5797H5.9748C5.50021 6.5797 5.11543 6.19491 5.11543 5.72032ZM55 16.86V39.1395C55 39.4465 54.8363 39.7302 54.5703 39.8837L35.2757 51.0235C35.1429 51.1002 34.9944 51.1386 34.846 51.1386C34.6977 51.1386 34.5492 51.1003 34.4164 51.0235L15.3213 39.9988H0.859375C0.384785 39.9988 0 39.614 0 39.1394C0 38.6648 0.384785 38.28 0.859375 38.28H14.6921V28.8591H5.9748C5.50021 28.8591 5.11543 28.4743 5.11543 27.9997C5.11543 27.5251 5.50021 27.1404 5.9748 27.1404H14.6921V17.7193H0.859375C0.384785 17.7193 0 17.3346 0 16.86C0 16.3854 0.384785 16.0006 0.859375 16.0006H15.3212L31.6388 6.57959H23.9193C23.4447 6.57959 23.0599 6.1948 23.0599 5.72021C23.0599 5.24562 23.4447 4.86084 23.9193 4.86084H34.846C34.9969 4.86084 35.1451 4.90059 35.2757 4.976L54.5703 16.1158C54.8363 16.2693 55 16.553 55 16.86ZM16.4108 38.6432L33.9867 48.7907V28.4959L28.8559 25.5336L28.8558 32.8184C28.8558 33.1254 28.6921 33.4091 28.4261 33.5626C28.2932 33.6393 28.1447 33.6777 27.9964 33.6777C27.848 33.6777 27.6996 33.6394 27.5667 33.5626L21.9713 30.3321C21.7053 30.1786 21.5416 29.8949 21.5416 29.5879V21.3108L16.4107 18.3485V38.6432H16.4108ZM27.9965 23.0528L45.5724 12.9054L41.6957 10.6672L24.1199 20.8146L27.9965 23.0528ZM23.2604 22.303V29.0917L27.137 31.3298L27.1371 24.5413L23.2604 22.303ZM52.4219 16.86L47.2911 13.8977L29.7151 24.0451L34.846 27.0074L52.4219 16.86ZM34.846 6.71258L17.2702 16.86L22.4011 19.8222L39.9769 9.67484L34.846 6.71258ZM53.2812 38.6434V18.3484L35.7054 28.4959V48.7907L53.2812 38.6434Z"
                            fill="#FF7245"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1338_28731">
                            <rect
                              width={55}
                              height={55}
                              fill="white"
                              transform="translate(0 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="info">
                    <h4 className="title">Fast Delivery</h4>
                    <p className="content">
                      All orders of $120 or more of eligible
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8} className="service-item">
              <div className="box-service">
                <div className="service-wrap">
                  <div className="box-icon">
                    <div className="icon">
                      <svg
                        width={56}
                        height={56}
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M52.42 5.07307C50.34 4.93787 45.1582 4.36587 42.02 1.97214C41.2076 1.34262 40.0721 1.34262 39.2597 1.97214C36.1197 4.36587 30.9397 4.93787 28.8597 5.07307C27.6869 5.14607 26.7717 6.11589 26.7667 7.29087V14.2883C26.7674 17.6741 27.5611 21.0127 29.0841 24.0366H6.83333C4.44129 24.0395 2.50287 25.9779 2.5 28.3699V49.1699C2.50287 51.562 4.44129 53.5004 6.83333 53.5033H43.2333C45.6254 53.5004 47.5638 51.562 47.5667 49.1699V30.2029C51.9743 26.0817 54.4833 20.3225 54.5 14.2883V7.29087C54.4954 6.12058 53.5876 5.1526 52.42 5.07307ZM45.8333 49.1699C45.8333 50.6059 44.6693 51.7699 43.2333 51.7699H6.83333C5.39739 51.7699 4.23333 50.6059 4.23333 49.1699V28.3699C4.23333 26.934 5.39739 25.7699 6.83333 25.7699H30.06C30.1943 25.9857 30.32 26.2033 30.4613 26.4182C32.7576 29.8378 35.9642 32.5473 39.719 34.2407C40.302 34.5036 40.9698 34.5036 41.5529 34.2407C43.0721 33.5521 44.5082 32.6929 45.8333 31.6797V49.1699ZM52.7667 14.2883C52.7378 22.2227 48.0725 29.4074 40.8361 32.6617C40.7068 32.7193 40.559 32.7193 40.4297 32.6617C36.969 31.1013 34.0138 28.6039 31.8982 25.4519C29.679 22.1521 28.4957 18.2649 28.5 14.2883V7.29087C28.5018 7.03178 28.7042 6.81844 28.9628 6.80294C31.7439 6.62267 36.9145 5.93627 40.3031 3.35014C40.4969 3.19873 40.7689 3.19873 40.9627 3.35014C44.3522 5.93454 49.5227 6.62267 52.3039 6.80294C52.5625 6.81844 52.7649 7.03178 52.7667 7.29087V14.2883Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M49.555 9.2634C46.7351 8.92099 44.0002 8.07219 41.482 6.75787C40.9559 6.45981 40.312 6.45981 39.7859 6.75787C37.2675 8.07245 34.5322 8.92126 31.712 9.2634C30.8639 9.38945 30.2353 10.1167 30.2335 10.9742V15.2885C30.2297 18.9199 31.3097 22.4699 33.3353 25.4839C34.9889 27.9388 37.2003 29.9673 39.7885 31.4033C40.3139 31.6909 40.9497 31.6909 41.475 31.4033C47.3545 28.1694 51.0147 21.9986 51.0335 15.2885V10.9742C51.0317 10.1167 50.4031 9.38945 49.555 9.2634ZM49.3002 15.2885C49.2824 21.3698 45.9633 26.9617 40.6335 29.8901H40.6248C38.2769 28.5862 36.271 26.7448 34.7714 24.5167C32.939 21.7883 31.9625 18.5751 31.9668 15.2885L31.9573 10.9759C34.9911 10.612 37.9322 9.6931 40.6335 8.265C43.332 9.69146 46.2697 10.6098 49.3002 10.9742V15.2885Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M9.43304 36.3034H12.8997C14.3356 36.3034 15.4997 35.1394 15.4997 33.7034V31.9701C15.4997 30.5341 14.3356 29.3701 12.8997 29.3701H9.43304C7.9971 29.3701 6.83304 30.5341 6.83304 31.9701V33.7034C6.83304 35.1394 7.9971 36.3034 9.43304 36.3034ZM8.56637 31.9701C8.56637 31.4914 8.95439 31.1034 9.43304 31.1034H12.8997C13.3784 31.1034 13.7664 31.4914 13.7664 31.9701V33.7034C13.7664 34.1821 13.3784 34.5701 12.8997 34.5701H9.43304C8.95439 34.5701 8.56637 34.1821 8.56637 33.7034V31.9701Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M7.69971 40.6367H11.1664C11.645 40.6367 12.033 40.2487 12.033 39.77C12.033 39.2914 11.645 38.9034 11.1664 38.9034H7.69971C7.22106 38.9034 6.83304 39.2914 6.83304 39.77C6.83304 40.2487 7.22106 40.6367 7.69971 40.6367Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M18.0998 38.9034H14.6331C14.1545 38.9034 13.7664 39.2914 13.7664 39.77C13.7664 40.2487 14.1545 40.6367 14.6331 40.6367H18.0998C18.5784 40.6367 18.9664 40.2487 18.9664 39.77C18.9664 39.2914 18.5784 38.9034 18.0998 38.9034Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M25.0332 38.9034H21.5665C21.0879 38.9034 20.6998 39.2914 20.6998 39.77C20.6998 40.2487 21.0879 40.6367 21.5665 40.6367H25.0332C25.5118 40.6367 25.8998 40.2487 25.8998 39.77C25.8998 39.2914 25.5118 38.9034 25.0332 38.9034Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M31.9666 38.9034H28.4999C28.0212 38.9034 27.6332 39.2914 27.6332 39.77C27.6332 40.2487 28.0212 40.6367 28.4999 40.6367H31.9666C32.4452 40.6367 32.8332 40.2487 32.8332 39.77C32.8332 39.2914 32.4452 38.9034 31.9666 38.9034Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M39.7666 39.77C39.7666 39.2914 39.3786 38.9034 38.8999 38.9034H35.4333C34.9546 38.9034 34.5666 39.2914 34.5666 39.77C34.5666 40.2487 34.9546 40.6367 35.4333 40.6367H38.8999C39.3786 40.6367 39.7666 40.2487 39.7666 39.77Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M13.7668 44.1032H11.1668C10.6882 44.1032 10.3002 44.4912 10.3002 44.9699C10.3002 45.4485 10.6882 45.8365 11.1668 45.8365H13.7668C14.2455 45.8365 14.6335 45.4485 14.6335 44.9699C14.6335 44.4912 14.2455 44.1032 13.7668 44.1032Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M13.7664 47.5699H7.69971C7.22106 47.5699 6.83304 47.9579 6.83304 48.4366C6.83304 48.9152 7.22106 49.3032 7.69971 49.3032H13.7664C14.245 49.3032 14.633 48.9152 14.633 48.4366C14.633 47.9579 14.245 47.5699 13.7664 47.5699Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M38.0335 14.6366V15.5033C37.0762 15.5033 36.3002 16.2793 36.3002 17.2366V22.4366C36.3002 23.3939 37.0762 24.1699 38.0335 24.1699H43.2335C44.1908 24.1699 44.9669 23.3939 44.9669 22.4366V17.2366C44.9669 16.2793 44.1908 15.5033 43.2335 15.5033V14.6366C43.2335 13.2006 42.0695 12.0366 40.6335 12.0366C39.1976 12.0366 38.0335 13.2006 38.0335 14.6366ZM39.7669 14.6366C39.7669 14.1579 40.1549 13.7699 40.6335 13.7699C41.1122 13.7699 41.5002 14.1579 41.5002 14.6366V15.5033H39.7669V14.6366ZM43.2335 17.2366V22.4366H38.0335V17.2366H43.2335Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M40.6331 20.7033C41.1118 20.7033 41.4998 20.3153 41.4998 19.8366C41.4998 19.358 41.1118 18.97 40.6331 18.97C40.1545 18.97 39.7664 19.358 39.7664 19.8366C39.7664 20.3153 40.1545 20.7033 40.6331 20.7033Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M41.5002 48.4366H37.1669C36.6882 48.4366 36.3002 48.8246 36.3002 49.3032C36.3002 49.7819 36.6882 50.1699 37.1669 50.1699H42.3669C42.8455 50.1699 43.2335 49.7819 43.2335 49.3032V44.9699C43.2335 44.4912 42.8455 44.1032 42.3669 44.1032C41.8882 44.1032 41.5002 44.4912 41.5002 44.9699V48.4366Z"
                          fill="#FF7245"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="info">
                    <h4 className="title">Secure Payment</h4>
                    <p className="content">Secure and manage your payments.</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8} className="service-item">
              <div className="box-service">
                <div className="service-wrap">
                  <div className="box-icon">
                    <div className="icon">
                      <svg
                        width={55}
                        height={56}
                        viewBox="0 0 55 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M53.0295 29.9705L42.3612 19.3022C42.1224 19.0618 41.8382 18.8713 41.5251 18.7416C41.2121 18.612 40.8764 18.5457 40.5376 18.5468H25.7812V20.2656H30.0781V33.1562H31.7969V20.2656H40.5376C40.6506 20.2655 40.7625 20.2877 40.8669 20.3309C40.9713 20.3741 41.0661 20.4375 41.146 20.5174L42.613 21.9843H38.6719C38.216 21.9843 37.7789 22.1654 37.4565 22.4877C37.1342 22.8101 36.9531 23.2472 36.9531 23.7031V31.4374C36.9531 31.8933 37.1342 32.3305 37.4565 32.6528C37.7789 32.9751 38.216 33.1562 38.6719 33.1562H51.5625V40.0312C51.5625 40.2591 51.472 40.4777 51.3108 40.6389C51.1496 40.8 50.931 40.8906 50.7031 40.8906H48.9156C48.7101 39.4598 47.9957 38.1511 46.9034 37.2045C45.8111 36.2578 44.4142 35.7367 42.9688 35.7367C41.5233 35.7367 40.1264 36.2578 39.0341 37.2045C37.9418 38.1511 37.2274 39.4598 37.0219 40.8906H24.8531C24.6476 39.4598 23.9332 38.1511 22.8409 37.2045C21.7486 36.2578 20.3517 35.7367 18.9062 35.7367C17.4608 35.7367 16.0639 36.2578 14.9716 37.2045C13.8793 38.1511 13.1649 39.4598 12.9594 40.8906H11.1719C10.944 40.8906 10.7254 40.8 10.5642 40.6389C10.403 40.4777 10.3125 40.2591 10.3125 40.0312V32.2968H8.59375V40.0312C8.59375 40.715 8.86537 41.3707 9.34887 41.8542C9.83236 42.3377 10.4881 42.6093 11.1719 42.6093H12.9594C13.1469 43.916 13.7605 45.1243 14.7048 46.0468H1.71875V47.7656H42.9688C44.4138 47.7628 45.8096 47.2404 46.9014 46.2938C47.9932 45.3471 48.7081 44.0394 48.9156 42.6093H50.7031C51.3869 42.6093 52.0426 42.3377 52.5261 41.8542C53.0096 41.3707 53.2812 40.715 53.2812 40.0312V30.5781C53.2812 30.3502 53.1906 30.1316 53.0295 29.9705ZM14.6094 41.7499C14.6094 40.9001 14.8614 40.0693 15.3335 39.3627C15.8057 38.6561 16.4768 38.1054 17.2619 37.7801C18.0471 37.4549 18.911 37.3698 19.7445 37.5356C20.578 37.7014 21.3437 38.1107 21.9446 38.7116C22.5455 39.3125 22.9548 40.0782 23.1206 40.9117C23.2864 41.7452 23.2013 42.6091 22.876 43.3943C22.5508 44.1794 22.0001 44.8505 21.2935 45.3227C20.5868 45.7948 19.7561 46.0468 18.9062 46.0468C17.7671 46.0455 16.6749 45.5923 15.8694 44.7868C15.0639 43.9813 14.6107 42.8891 14.6094 41.7499ZM23.1077 46.0468C24.052 45.1243 24.6656 43.916 24.8531 42.6093H37.0219C37.2094 43.916 37.823 45.1243 38.7673 46.0468H23.1077ZM42.9688 46.0468C42.1189 46.0468 41.2882 45.7948 40.5815 45.3227C39.8749 44.8505 39.3242 44.1794 38.999 43.3943C38.6737 42.6091 38.5886 41.7452 38.7544 40.9117C38.9202 40.0782 39.3295 39.3125 39.9304 38.7116C40.5313 38.1107 41.297 37.7014 42.1305 37.5356C42.964 37.3698 43.8279 37.4549 44.6131 37.7801C45.3982 38.1054 46.0693 38.6561 46.5415 39.3627C47.0136 40.0693 47.2656 40.9001 47.2656 41.7499C47.2643 42.8891 46.8111 43.9813 46.0056 44.7868C45.2001 45.5923 44.1079 46.0455 42.9688 46.0468ZM38.6719 31.4374V23.7031H44.3317L51.5625 30.9338V31.4374H38.6719Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M19.7656 40.8907H18.0469V42.6094H19.7656V40.8907Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M43.8281 40.8907H42.1094V42.6094H43.8281V40.8907Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M6.01562 38.3126H1.71875V40.0313H6.01562V38.3126Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M6.01562 34.875H3.4375V36.5938H6.01562V34.875Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M6.01562 31.4375H4.29688V33.1563H6.01562V31.4375Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M12.8906 30.5781C15.1002 30.5781 17.2602 29.9229 19.0974 28.6953C20.9346 27.4677 22.3665 25.7229 23.2121 23.6815C24.0577 21.6401 24.2789 19.3939 23.8478 17.2267C23.4168 15.0596 22.3527 13.069 20.7903 11.5065C19.2279 9.94413 17.2373 8.88011 15.0701 8.44904C12.903 8.01798 10.6567 8.23922 8.61533 9.08479C6.57394 9.93036 4.82913 11.3623 3.60155 13.1995C2.37397 15.0367 1.71875 17.1967 1.71875 19.4062C1.72216 22.3682 2.90029 25.2078 4.99468 27.3022C7.08908 29.3966 9.92871 30.5747 12.8906 30.5781ZM12.8906 9.95313C14.7603 9.95313 16.5879 10.5075 18.1425 11.5463C19.6971 12.585 20.9087 14.0614 21.6242 15.7887C22.3397 17.516 22.5269 19.4167 22.1621 21.2505C21.7974 23.0842 20.897 24.7686 19.575 26.0906C18.253 27.4127 16.5686 28.313 14.7348 28.6777C12.9011 29.0425 11.0004 28.8553 9.27307 28.1398C7.54574 27.4243 6.06936 26.2127 5.03064 24.6581C3.99192 23.1036 3.4375 21.2759 3.4375 19.4062C3.44046 16.9 4.43736 14.4973 6.20952 12.7251C7.98169 10.953 10.3844 9.95609 12.8906 9.95313Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M12.8906 27.1407C13.1185 27.1406 13.3371 27.05 13.4982 26.8889C14.0516 26.3354 18.9062 21.3743 18.9062 17.6875C18.9062 16.0921 18.2725 14.562 17.1443 13.4339C16.0162 12.3057 14.4861 11.6719 12.8906 11.6719C11.2952 11.6719 9.76508 12.3057 8.63694 13.4339C7.50879 14.562 6.875 16.0921 6.875 17.6875C6.875 21.3743 11.7296 26.3354 12.283 26.8889C12.4442 27.05 12.6627 27.1406 12.8906 27.1407ZM12.8906 13.3907C14.0298 13.392 15.1219 13.8452 15.9275 14.6507C16.733 15.4562 17.1861 16.5484 17.1875 17.6875C17.1875 19.8927 14.483 23.3001 12.8906 25.0361C11.2982 23.3001 8.59375 19.8927 8.59375 17.6875C8.59511 16.5484 9.04826 15.4562 9.85378 14.6507C10.6593 13.8452 11.7514 13.392 12.8906 13.3907Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M15.4687 17.6875C15.4687 17.1776 15.3175 16.6792 15.0342 16.2552C14.751 15.8312 14.3483 15.5008 13.8772 15.3057C13.4061 15.1105 12.8878 15.0595 12.3876 15.1589C11.8875 15.2584 11.4282 15.504 11.0676 15.8645C10.707 16.2251 10.4615 16.6845 10.362 17.1846C10.2625 17.6847 10.3136 18.203 10.5087 18.6741C10.7039 19.1452 11.0343 19.5479 11.4583 19.8312C11.8823 20.1144 12.3807 20.2657 12.8906 20.2657C13.5744 20.2657 14.2301 19.994 14.7136 19.5105C15.1971 19.027 15.4687 18.3713 15.4687 17.6875ZM12.0312 17.6875C12.0312 17.5176 12.0816 17.3514 12.1761 17.2101C12.2705 17.0688 12.4047 16.9586 12.5617 16.8936C12.7188 16.8285 12.8916 16.8115 13.0583 16.8447C13.225 16.8778 13.3781 16.9597 13.4983 17.0799C13.6185 17.2 13.7003 17.3532 13.7335 17.5199C13.7666 17.6866 13.7496 17.8594 13.6846 18.0164C13.6195 18.1734 13.5094 18.3076 13.3681 18.4021C13.2267 18.4965 13.0606 18.5469 12.8906 18.5469C12.6627 18.5469 12.4441 18.4564 12.2829 18.2952C12.1218 18.134 12.0312 17.9154 12.0312 17.6875Z"
                          fill="#FF7245"
                        />
                        <path
                          d="M37.8125 34.875H34.375V36.5938H37.8125V34.875Z"
                          fill="#FF7245"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="info">
                    <h4 className="title">Order Tracking</h4>
                    <p className="content">
                      Using order number or tracking number.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <section className="banner-container">
        <Row>
          <Col span={12}>
            <div style={{ overflow: "hidden", position: "relative" }}>
              <div
                className="banner"
                style={{
                  backgroundImage: 'url("/products/banner_h4_1.jpg")',
                }}
              ></div>
              <div className="text-banner">
                <Typography.Title level={5} style={{ color: "#ff7245" }}>
                  NEW ARRIVAL
                </Typography.Title>
                <Typography.Title
                  level={1}
                  style={{ fontWeight: 700, fontSize: 48 }}
                >
                  Summer
                  <br />
                  Sale -50%
                </Typography.Title>
                <Link href={"/products"}>
                  <Button
                    className="btn-btn"
                    style={{ textTransform: "uppercase" }}
                  >
                    See more
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ overflow: "hidden", position: "relative" }}>
              <div
                className="banner"
                style={{
                  backgroundImage: 'url("/products/banner_h4_2.jpg")',
                }}
              ></div>
              <div className="text-banner">
                <Typography.Title level={5} style={{ color: "#ff7245" }}>
                  NEW ARRIVAL
                </Typography.Title>
                <Typography.Title
                  level={1}
                  style={{ fontWeight: 700, fontSize: 48 }}
                >
                  Spring
                  <br />
                  Collection
                </Typography.Title>
                <Link href={"/products"}>
                  <Button
                    className="btn-btn"
                    style={{ textTransform: "uppercase" }}
                  >
                    See more
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </section>
      <section>
        <div className="container">
          <div className="filter-center">
            <button
              className={`cate ${currentFilter === "Featured" ? "active" : ""}`}
              onClick={() => {
                handleFilter("Featured");
              }}
            >
              Featured
            </button>
            <button
              className={`cate ${
                currentFilter === "Top Seller" ? "active" : ""
              }`}
              onClick={() => {
                handleFilter("Top Seller");
              }}
            >
              Top Seller
            </button>
            <button
              className={`cate ${currentFilter === "Latest" ? "active" : ""}`}
              onClick={() => {
                handleFilter("Latest");
              }}
            >
              Latest
            </button>
          </div>
          <div className="products-container">
            {filteredProducts().map((product: IProduct) => (
              <div key={product.id} className="products">
                <Link href={`/products/${product.id}`}>
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${product.thumbnail})` }}
                  ></div>
                </Link>
                <div className="content">
                  <Link href={`/products/${product.id}`}>
                    <h4>{product.name}</h4>
                  </Link>
                  <p>{formattedPrice(product.price)}</p>
                </div>
                <div className="menu">
                  <div className="icon" onClick={() => onAddItem(product)}>
                    <ShoppingOutlined title="Add To Cart" />
                  </div>
                  <div
                    className="icon"
                    onClick={() => handleQuickview(product.id)}
                  >
                    <SearchOutlined title="Quickview" />
                  </div>
                  <Link href={"/wishlist"} id="wishlist-btn">
                    <div className="icon">
                      <HeartOutlined title="Add To Wishlist" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: " #E5F3F4" }}>
        <div className="container">
          <div className="contact-us">
            <div className="contact-content">
              <Typography.Title
                level={3}
                style={{ textTransform: "uppercase", margin: 0 }}
              >
                Keep Me Updated
              </Typography.Title>
              <div className="contact-text">
                “ Fantastic makeup, went on great and I felt so much better
                protected all day! Would recommend to anyone. ”
              </div>
            </div>
            <form>
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <input
                  style={{
                    margin: 0,
                    padding: "4px 11px",
                    position: "relative",
                    display: "inline-block",
                    width: "100%",
                    borderRadius: "6px",
                    borderStartEndRadius: 0,
                    borderEndEndRadius: 0,
                    marginInlineEnd: -1,
                    border: "none",
                    outline: "none",
                  }}
                  type="text"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/,
                  })}
                  placeholder="Your email ..."
                />
                {contextHolder}
                <Button type="primary" onClick={handleSubmit(openMessage)}>
                  <MailOutlined />
                </Button>
              </Space.Compact>
              {errors.email?.type === "required" && (
                <p
                  style={{ position: "absolute", marginTop: 10, color: "red" }}
                >
                  Email can not be left blank.
                </p>
              )}
              {errors.email?.type === "pattern" && (
                <p
                  style={{ position: "absolute", marginTop: 10, color: "red" }}
                >
                  The email is not in the correct format.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
      <section style={{ margin: "60px auto" }}>
        <div className="container">
          <Flex justify="space-between" gap="large">
            <img
              alt="avatar"
              src="/products/banner_h1_4.png"
              style={{ display: "block", width: "50%" }}
            />
            <Flex
              vertical
              align="flex-start"
              justify="space-around"
              style={{
                padding: 32,
              }}
            >
              <div>
                <Typography.Title level={4} style={{ color: "#ff7245" }}>
                  ABOUT US
                </Typography.Title>
                <Typography.Title
                  level={1}
                  style={{
                    fontWeight: 700,
                    fontSize: 48,
                    textTransform: "capitalize",
                  }}
                >
                  Mindless Surf Skate
                  <br /> Pro Trucks
                </Typography.Title>
                <Typography.Text type="secondary">
                  This will provide you with everything to turn your current
                  deck into a fully rippable surf skate!
                </Typography.Text>
              </div>
              <Link href={"/products"}>
                <Button
                  className="btn-btn"
                  style={{ textTransform: "uppercase" }}
                >
                  Get Start
                </Button>
              </Link>
            </Flex>
          </Flex>
        </div>
      </section>
      <section>
        <div className="user-rated-container">
          <Typography.Title
            level={1}
            style={{ color: "#ff7245", textTransform: "uppercase" }}
          >
            What They Say
          </Typography.Title>
          <Rated />
        </div>
      </section>
      {showImage ? (
        <div className="img-quickview-container">
          <div className="img-quickview">
            <MDBCarousel showControls dark>
              <MDBCarouselItem
                itemId={1}
                className="d-block w-100"
                src={currentImg[0]}
                alt="..."
              />
              <MDBCarouselItem
                itemId={2}
                className="d-block w-100"
                src={currentImg[1]}
                alt="..."
              />
            </MDBCarousel>
            <div className="close-image" onClick={handleCloseImg}>
              <CloseOutlined />
            </div>
          </div>
        </div>
      ) : null}
      {loading ? (
        <div className="img-quickview-container">
          <span className="loader-1"></span>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
