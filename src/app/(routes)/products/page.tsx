"use client";

import { useState } from "react";
import { formattedPrice, items } from "@/app/_assets/libs";
import { Breadcrumb, Drawer, Dropdown, Space } from "antd";
import {
  FilterOutlined,
  DownOutlined,
  RightOutlined,
  ShoppingOutlined,
  SearchOutlined,
  HeartOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Loader from "@/app/_assets/components/Loader";
import { IProduct } from "@/app/_assets/types/product";
import ProductServices from "@/app/_assets/services/products.services";
import Notification from "@/app/_assets/components/Notification";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { add } from "@/app/_assets/redux/features/cart/cartSlice";

const Products: React.FC = () => {
  const [showImage, setShowImage] = useState<boolean>(false);
  const [currentImg, setCurrentImg] = useState<string>("");
  const [sortingLabel, setSortingLabel] = useState<string>("Sorting");
  const [open, setOpen] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [currentFilterType, setCurrentFilterType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("");

  const { products, error, isLoading } = ProductServices();
  const dispatch = useDispatch();

  const filteredProducts = (): IProduct[] => {
    if (currentFilter === "" && currentFilterType === "" && sort === "") {
      return products.result;
    }

    const filterProducts = products.result.filter((product: IProduct) => {
      if (currentFilterType === "category") {
        return product.category === currentFilter;
      } else if (currentFilterType === "size") {
        return product.size === currentFilter;
      } else if (currentFilterType === "color") {
        return product.color === currentFilter;
      }
      return true;
    });

    if (sort === "Alphabetically, A-Z") {
      return filterProducts.sort((a: IProduct, b: IProduct) =>
        a.name.localeCompare(b.name)
      );
    } else if (sort === "Price, low to high") {
      return filterProducts.sort(
        (a: IProduct, b: IProduct) => a.price - b.price
      );
    } else if (sort === "Price, high to low") {
      return filterProducts.sort(
        (a: IProduct, b: IProduct) => b.price - a.price
      );
    }

    return filterProducts;
  };

  const handleFilter = ({
    type,
    params,
  }: {
    type: string;
    params: string;
  }): void => {
    setLoading(true);
    document.body.classList.add("overflow-hidden");
    setTimeout(() => {
      setLoading(false);
      setCurrentFilter(params);
      setCurrentFilterType(type);
      document.body.classList.remove("overflow-hidden");
    }, 800);
  };

  const handleSortingLabel = (label: string): void => {
    setSortingLabel(label);
    setSort(label);
  };

  const showDrawer = (): void => {
    setOpen(true);
  };

  const onClose = (): void => {
    setOpen(false);
  };

  const handleQuickview = (id: string): void => {
    const pro = products?.result.find((product: IProduct) => product.id === id);
    setCurrentImg(pro.images);
    document.body.classList.add("overflow-hidden");
    setShowImage(true);
  };

  const handleCloseImg = (): void => {
    setShowImage(false);
    document.body.classList.remove("overflow-hidden");
  };

  const onAddItem = (product: IProduct) => {
    Notification(product, 1);
    dispatch(add({ product: product, quantity: 1 }));
  };

  if (isLoading) return <Loader />;
  if (!products) return null;

  return (
    <section>
      <div className="breadcrumb">
        <h1 className="breadcrumb-title">Products</h1>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link href="/">Home</Link>,
            },
            {
              title: "Products",
            },
          ]}
        />
      </div>
      <div className="container">
        <div className="filter-container">
          <div className="filter">
            <button onClick={showDrawer}>
              <FilterOutlined />
              Filter
            </button>
            <Drawer
              placement="left"
              onClose={onClose}
              width={300}
              title="Filter"
              open={open}
            >
              <div className="filter-side-bar">
                <div className="item">
                  <div className="item-title">
                    <h2>Categories</h2>
                  </div>
                  <ul>
                    <li
                      className={`cate ${
                        currentFilter === "Featured" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleFilter({
                          type: "category",
                          params: "Featured",
                        });
                        onClose();
                      }}
                    >
                      <RightOutlined />
                      Featured
                    </li>
                    <li
                      className={`cate ${
                        currentFilter === "Top Seller" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleFilter({
                          type: "category",
                          params: "Top Seller",
                        });
                        onClose();
                      }}
                    >
                      <RightOutlined />
                      Top Seller
                    </li>
                    <li
                      className={`cate ${
                        currentFilter === "Latest" ? "active" : ""
                      }`}
                      onClick={() => {
                        handleFilter({
                          type: "category",
                          params: "Latest",
                        });
                        onClose();
                      }}
                    >
                      <RightOutlined />
                      Latest
                    </li>
                  </ul>
                </div>
                <div className="item">
                  <div className="item-title">
                    <h2>Size</h2>
                  </div>
                  <ul className="size">
                    <li>
                      <button
                        className={currentFilter === "S" ? "active" : ""}
                        onClick={() => {
                          handleFilter({
                            type: "size",
                            params: "S",
                          });
                          onClose();
                        }}
                      >
                        S
                      </button>
                    </li>
                    <li>
                      <button
                        className={currentFilter === "M" ? "active" : ""}
                        onClick={() => {
                          handleFilter({
                            type: "size",
                            params: "M",
                          });
                          onClose();
                        }}
                      >
                        M
                      </button>
                    </li>
                    <li>
                      <button
                        className={currentFilter === "L" ? "active" : ""}
                        onClick={() => {
                          handleFilter({
                            type: "size",
                            params: "L",
                          });
                          onClose();
                        }}
                      >
                        L
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="item">
                  <div className="item-title">
                    <h2>Color</h2>
                  </div>
                  <ul className="flex">
                    <li>
                      <button
                        className={`color ${
                          currentFilter === "Black" ? "active" : ""
                        }`}
                        style={{ backgroundColor: "black" }}
                        onClick={() => {
                          handleFilter({
                            type: "color",
                            params: "Black",
                          });
                          onClose();
                        }}
                      ></button>
                    </li>
                    <li>
                      <button
                        className={`color ${
                          currentFilter === "Blue" ? "active" : ""
                        }`}
                        style={{ backgroundColor: "blue" }}
                        onClick={() => {
                          handleFilter({
                            type: "color",
                            params: "Blue",
                          });
                          onClose();
                        }}
                      ></button>
                    </li>
                    <li>
                      <button
                        className={`color ${
                          currentFilter === "White" ? "active" : ""
                        }`}
                        style={{ backgroundColor: "white" }}
                        onClick={() => {
                          handleFilter({
                            type: "color",
                            params: "White",
                          });
                          onClose();
                        }}
                      ></button>
                    </li>
                  </ul>
                </div>
                <button
                  className="clear-filter"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      setCurrentFilter("");
                      setCurrentFilterType("");
                      onClose();
                    }, 500);
                  }}
                >
                  Clear Filtered
                </button>
              </div>
            </Drawer>
          </div>
          <div className="sorting">
            <Dropdown
              menu={{
                items,
                onClick: ({ key }) =>
                  handleSortingLabel(
                    items.find((item) => item.key === key)?.label ||
                      "Default Sorting"
                  ),
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {sortingLabel}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
        <div className="products-container">
          {filteredProducts()?.map((product: IProduct) => (
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
    </section>
  );
};

export default Products;
