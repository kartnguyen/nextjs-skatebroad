"use client";

import { useState } from "react";
import { Menu } from "antd";

const items = [
  {
    label: "DESCRIPTION",
    key: "description",
  },
  {
    label: "ADDITIONAL INFORMATION",
    key: "information",
  },
];

const Details = () => {
  const [current, setCurrent] = useState<string>("description");

  const onClick = (e: { key: string }) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div className="content">
        {current == "description" ? (
          <div className="product-desc">
            <p>
              Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec
              vehicula, eros quam gravida nis.
            </p>
            <p>
              Being able to read a novel in another language and understand it
              is a huge achievement. You&apos;ll feel accomplished the moment
              you read that final page, close the book, and reflect on the
              experience. You might find yourself at the last page faster than
              you thought—once you begin reading these books, you won&apos;t be
              able to put them down.
            </p>
            <div className="para-1">
              <div className="img">
                <img
                  src="/products/apmenuitem_ihtml_5.jpg"
                  alt=""
                  width={458}
                  height={315}
                />
              </div>
              <div className="text">
                <h2>BRAND</h2>
                <p>
                  With eye-catching artwork, step-by-step diagrams, and
                  illustrations that break down complicated ideas into
                  manageable concepts, The Science Book will have readers
                  conversant in genetic engineering, black holes, and global
                  warming in no time. Along the way are found mini-biographies
                  of the most well-known scientists, and a glossary of helpful
                  scientific terms. For students, and students of the world,
                  there is no better way to explore the fascinating, strange,
                  and mysterious world of science than in The Science Book.
                </p>
              </div>
            </div>
            <br />
            <div className="para-2">
              <div className="item">
                <h2>PRODUCT DETAILS</h2>
                <ul>
                  <li>You show me what is deep as sea</li>
                  <li>Crew neck</li>
                  <li>Short sleeves</li>
                  <li>Large logo print to chest</li>
                  <li>Regular fit</li>
                  <li>True size</li>
                </ul>
              </div>
              <div className="item">
                <h2>SIZE &amp; FIT</h2>
                <ul>
                  <li>Model&apos;s height: 182.5cm/6&apos;0″</li>
                  <li>Model is wearing: Size Medium</li>
                </ul>
              </div>
              <div className="item">
                <h2>ABOUT ME</h2>
                <ul>
                  <li>Soft, breathable jersey</li>
                  <li>T-shirt fabric</li>
                  <li>Main: 95% Cotton, 5% Elastane</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="product-info">
            <div className="info">
              <div className="info-1">
                <div className="title_content">
                  <p className="more_info">More Infomation To You</p>
                  <h3>Things you need to know</h3>
                </div>
                <div className="row">
                  <div className="content1">
                    <p className="info_1">
                      We use industry standard SSL encryption to protect your
                      details. Potentially sensitive information such as your
                      name, address and card details are encoded so they can
                      only be read on the secure server.
                    </p>
                    <ul className="list-unstyled">
                      <li>Safe Payments</li>
                      <li>Accept Credit Cart</li>
                      <li>Different Payment Method</li>
                      <li>Price Include VAT</li>
                      <li>Easy To Order</li>
                    </ul>
                  </div>
                  <div className="content2">
                    <div className="info2">
                      <h3>Express Delivery</h3>
                      <ul className="list-unstyled">
                        <li>Europe &amp; USA within 2-4 days</li>
                        <li>Rest of the world within 3-7 days</li>
                        <li>Selected locations</li>
                      </ul>
                    </div>
                    <div className="info2">
                      <h3 className="more-info">Need more information</h3>
                      <ul className="list-unstyled">
                        <li>
                          <a href="">Orders &amp; Shipping</a>
                        </li>
                        <li>
                          <a href="">Returns &amp; Refunds</a>
                        </li>
                        <li>
                          <a href="">Payments</a>
                        </li>
                        <li>
                          <a href="">Your Orders</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-2">
                <img
                  className="img"
                  alt=""
                  src="/products/blog_3_1024x1024.jpg"
                  width={"100%"}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Details;
