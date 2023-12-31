"use client";

import { useEffect } from "react";
import { RootState } from "@/app/_assets/redux/store";
import { Breadcrumb, Image, Table } from "antd";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { formattedPrice } from "@/app/_assets/libs";
import Link from "next/link";
import axios from "axios";

const Checkout: React.FC = () => {
  const cartState = useSelector((state: RootState) => state.cart);
  let order: any = {};
  if (typeof window !== "undefined") {
    order = JSON.parse(localStorage.getItem("order") || "{}");
  }

  useEffect(() => {
    const host: string = "https://provinces.open-api.vn/api/";

    const callAPI = (api: string) => {
      axios
        .get(api)
        .then((response) => {
          renderData(response.data, "city");
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    };

    callAPI(`${host}?depth=1`);

    const callApiDistrict = (api: string) => {
      axios
        .get(api)
        .then((response) => {
          renderData(response.data.districts, "district");
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    };

    const callApiWard = (api: string) => {
      axios
        .get(api)
        .then((response) => {
          renderData(response.data.wards, "ward");
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    };

    const renderData = (array: any[], select: string) => {
      let row = ' <option disable value="">Select</option>';
      array.forEach((element) => {
        row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
      });
      const selectElement = document.querySelector<HTMLSelectElement>(
        "#" + select
      );
      if (selectElement) {
        selectElement.innerHTML = row;
      }
    };

    const handleCityChange = () => {
      const selectedCity = document.querySelector<HTMLSelectElement>(
        "#city option:checked"
      );
      if (selectedCity) {
        const cityId = selectedCity.dataset.id;
        if (cityId) {
          callApiDistrict(`${host}p/${cityId}?depth=2`);
        }
      }
    };

    const handleDistrictChange = () => {
      const selectedDistrict = document.querySelector<HTMLSelectElement>(
        "#district option:checked"
      );
      if (selectedDistrict) {
        const districtId = selectedDistrict.dataset.id;
        if (districtId) {
          callApiWard(`${host}d/${districtId}?depth=2`);
        }
      }
    };

    document
      .querySelector<HTMLSelectElement>("#city")
      ?.addEventListener("change", handleCityChange);

    document
      .querySelector<HTMLSelectElement>("#district")
      ?.addEventListener("change", handleDistrictChange);

    return () => {
      document
        .querySelector<HTMLSelectElement>("#city")
        ?.removeEventListener("change", handleCityChange);

      document
        .querySelector<HTMLSelectElement>("#district")
        ?.removeEventListener("change", handleDistrictChange);
    };
  }, []);

  let totalPrice = 0;
  let totalProducts = 0;
  let shippingPrice: any;
  for (let i = 0; i < cartState.items.length; i++) {
    const item = cartState.items[i];
    totalPrice += item.product.price * item.quantity;
    totalProducts += item.quantity;
    if (totalProducts >= 2) {
      shippingPrice = 0;
    } else {
      shippingPrice = Math.floor(0.15 * totalPrice);
    }
  }

  const items = cartState.items;

  const dataSource = items.map((item) => ({
    key: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    img: item.product.thumbnail,
    total: item.product.price * item.quantity,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div className="cart-table">
          <Image
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: 80,
            }}
            src={record.img}
            alt=""
          />
          <p
            className="pro_name"
            style={{
              marginLeft: "10px",
            }}
          >
            {record.name}
          </p>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_: any, record: any) => formattedPrice(record.total),
    },
  ];
  const currentDate = new Date();
  const minDate = currentDate.toISOString().split("T")[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    localStorage.setItem("order", JSON.stringify(data));
    window.location.pathname = "/confirm";
  };
  return (
    <section className="checkout-page">
      <div className="container">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link href="/">Home</Link>,
            },
            {
              title: "Check Out",
            },
          ]}
        />
      </div>
      <div className="checkout_page">
        <form>
          <div className="container checkout_obj">
            <div className="information">
              <div className="delivery">
                <h3>Delivery</h3>
                <div className="list">
                  <div className="item">
                    <label htmlFor="name">
                      <p>Full Name</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input"
                      defaultValue={order.Name}
                      {...register("Name", {
                        required: true,
                        maxLength: 100,
                      })}
                      placeholder="Full Name"
                      aria-invalid={errors.Name ? "true" : "false"}
                    />
                    {errors.Name?.type === "required" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        Full name can not be left blank.
                      </p>
                    )}
                  </div>
                  <div className="item">
                    <label htmlFor="phone">
                      <p>Phone Number</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="input"
                      defaultValue={order.Phone}
                      {...register("Phone", {
                        required: true,
                        pattern: /^[0-9]{10}$/,
                      })}
                      aria-invalid={errors.Phone ? "true" : "false"}
                      placeholder="Phone Number"
                    />
                    {errors.Phone?.type === "required" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        Phone number can not be left blank.
                      </p>
                    )}
                    {errors.Phone?.type === "pattern" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        The phone number is not in the correct format.
                      </p>
                    )}
                  </div>
                  <div className="item">
                    <label htmlFor="email">
                      <p>Email</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="email"
                      defaultValue={order.Email}
                      aria-invalid={errors.Email ? "true" : "false"}
                      className="input"
                      {...register("Email", {
                        required: true,
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/,
                      })}
                      placeholder="Email"
                    />
                    {errors.Email?.type === "required" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        Email can not be left blank.
                      </p>
                    )}
                    {errors.Email?.type === "pattern" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        The email is not in the correct format.
                      </p>
                    )}
                  </div>
                  <div className="item">
                    <label htmlFor="city">
                      <p>City</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <select
                      id="city"
                      className="input"
                      {...register("City", {
                        validate: (value) =>
                          value !== "" || "Please select a city.",
                      })}
                    >
                      <option value="" selected>
                        Select City
                      </option>
                    </select>
                    {errors.City && typeof errors.City.message === "string" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        {errors.City.message}
                      </p>
                    )}
                  </div>
                  <div className="item">
                    <label htmlFor="district">
                      <p>District</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <select
                      id="district"
                      className="input"
                      {...register("District", {
                        validate: (value) =>
                          value !== "" || "Please select a district.",
                      })}
                    >
                      <option value="" selected>
                        Select District
                      </option>
                    </select>
                    {errors.District &&
                      typeof errors.District.message === "string" && (
                        <p style={{ marginTop: 10, color: "red" }}>
                          {errors.District.message}
                        </p>
                      )}
                  </div>
                  <div className="item">
                    <label htmlFor="ward">
                      <p>Ward</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <select
                      id="ward"
                      className="input"
                      {...register("Ward", {
                        validate: (value) =>
                          value !== "" || "Please select a ward.",
                      })}
                    >
                      <option value="" selected>
                        Select Ward
                      </option>
                    </select>
                    {errors.Ward && typeof errors.Ward.message === "string" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        {errors.Ward.message}
                      </p>
                    )}
                  </div>
                  <div className="item">
                    <label htmlFor="address">
                      <p>Address</p>
                      <span
                        className="required"
                        title="required"
                        style={{ marginLeft: 4 }}
                      >
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      defaultValue={order.Address}
                      aria-invalid={errors.Address ? "true" : "false"}
                      id="address"
                      {...register("Address", {
                        required: true,
                        maxLength: 100,
                      })}
                      className="input"
                      placeholder="Address"
                    />
                    {errors.Address?.type === "required" && (
                      <p style={{ marginTop: 10, color: "red" }}>
                        Address can not be left blank.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="schedule">
                <h3>Schedule</h3>
                <div className="list">
                  <div className="item">
                    <label htmlFor="dates">
                      <p>Date</p>
                    </label>
                    <input
                      type="date"
                      id="dates"
                      {...register("Date")}
                      className="input"
                      min={minDate}
                      defaultValue={order.Date ? order.Date : minDate}
                    />
                  </div>
                  <div className="item">
                    <label htmlFor="note">
                      <p>Note</p>
                    </label>
                    <textarea
                      id="note"
                      defaultValue={order.note}
                      {...register("note")}
                      className="input"
                    />
                  </div>
                </div>
              </div>
              <div className="method">
                <h3>
                  Payment
                  <span
                    className="required"
                    title="required"
                    style={{ marginLeft: 4 }}
                  >
                    *
                  </span>
                </h3>
                <div className="list">
                  <div className="method_item">
                    <label htmlFor="item1" className="item">
                      <input
                        type="radio"
                        id="item1"
                        defaultValue="online_payment"
                        {...register("payment", {
                          required: true,
                        })}
                        defaultChecked={
                          order.payment === "online_payment" ? true : false
                        }
                      />
                      <label htmlFor="item1" className="check-box" />
                      <p>Online Payment</p>
                    </label>
                  </div>
                  <div className="method_item">
                    <label htmlFor="item2" className="item">
                      <input
                        type="radio"
                        id="item2"
                        defaultValue="on_delivery"
                        {...register("payment", {
                          required: true,
                        })}
                        defaultChecked={
                          order.payment === "on_delivery" ? true : false
                        }
                      />
                      <label className="check-box" htmlFor="item2" />
                      <p>Cash on Delivery</p>
                    </label>
                  </div>
                  {errors.payment?.type === "required" && (
                    <p style={{ color: "red" }}>Chose your payment details.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="order">
              <h3>Shopping Cart</h3>
              <div className="order_item">
                <div className="cake">
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    size="small"
                  />
                </div>
                <div style={{ marginTop: "auto", marginRight: 16 }}>
                  <div className="item">
                    <p>Subtotal : </p>
                    <span className="ttbill">{formattedPrice(totalPrice)}</span>
                  </div>
                  <div className="item">
                    <div>
                      <p>Shipping : </p>
                      <p
                        style={{
                          fontSize: 11,
                          fontStyle: "italic",
                          marginTop: 4,
                        }}
                      >
                        (Free shipping when purchasing from 2 products)
                      </p>
                    </div>
                    <span className="ship">
                      {formattedPrice(shippingPrice)}
                    </span>
                  </div>
                  <div className="hr-container">
                    <div className="hr-line" />
                  </div>
                  <div className="item">
                    <h4>Total:</h4>
                    <span className="allbill" style={{ fontWeight: "bold" }}>
                      {formattedPrice(totalPrice + shippingPrice)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="check_out">
                <button
                  className="confirm"
                  style={{ cursor: "pointer" }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Check Out
                  <div className="triangle-top-right" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
