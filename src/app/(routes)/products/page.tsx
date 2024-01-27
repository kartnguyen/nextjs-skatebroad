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
import { useRouter } from "next/navigation";

const Products: React.FC = () => {
  const [showImage, setShowImage] = useState<boolean>(false);
  const [currentImg, setCurrentImg] = useState<string>("");
  const [sortingLabel, setSortingLabel] = useState<string>("Sorting");
  const [open, setOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<
    { type: string; value: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("");

  const { products, error, isLoading } = ProductServices();
  const dispatch = useDispatch();
  const router = useRouter();

  const filteredProducts = (): IProduct[] => {
    if (selectedFilters.length === 0 && sort === "") {
      return products.result;
    }

    const filterProducts = products.result.filter((product: IProduct) => {
      return selectedFilters.every((filter) => {
        const { type, value } = filter;
        if (type === "category" && value !== "") {
          return product.category === value;
        }
        if (type === "size" && value !== "") {
          return product.size === value;
        }
        if (type === "color" && value !== "") {
          return product.color === value;
        }
        return true;
      });
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

    const filtersQueryString = selectedFilters
      .filter((filter) => filter.value !== "")
      .map(({ type, value }) => `${type}=${value}`)
      .join("&");

    const newUrl = `products?${filtersQueryString.toString()}`;
    router.replace(newUrl, undefined);

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
      setSelectedFilters((prevFilters) => {
        const updatedFilters = prevFilters.map((filter) => {
          if (filter.type === type) {
            return { type, value: params };
          }
          return filter;
        });
        if (!updatedFilters.some((filter) => filter.type === type)) {
          return [...updatedFilters, { type, value: params }];
        }

        return updatedFilters;
      });
      document.body.classList.remove("overflow-hidden");
    }, 500);
  };

  const handleClearFilter = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSelectedFilters([]);
      onClose();
      router.push("/products");
    }, 100);
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

  const productsToDisplay = filteredProducts();

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
                        selectedFilters.some(
                          (filter) => filter.value === "Featured"
                        )
                          ? "active"
                          : ""
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
                        selectedFilters.some(
                          (filter) => filter.value === "Top Seller"
                        )
                          ? "active"
                          : ""
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
                        selectedFilters.some(
                          (filter) => filter.value === "Latest"
                        )
                          ? "active"
                          : ""
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
                        className={`${
                          selectedFilters.some((filter) => filter.value === "S")
                            ? "active"
                            : ""
                        }`}
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
                        className={`${
                          selectedFilters.some((filter) => filter.value === "M")
                            ? "active"
                            : ""
                        }`}
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
                        className={`${
                          selectedFilters.some((filter) => filter.value === "L")
                            ? "active"
                            : ""
                        }`}
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
                          selectedFilters.some(
                            (filter) => filter.value === "Black"
                          )
                            ? "active"
                            : ""
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
                          selectedFilters.some(
                            (filter) => filter.value === "Blue"
                          )
                            ? "active"
                            : ""
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
                          selectedFilters.some(
                            (filter) => filter.value === "White"
                          )
                            ? "active"
                            : ""
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
                <button className="clear-filter" onClick={handleClearFilter}>
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
        {productsToDisplay.length > 0 ? (
          <div className="products-container">
            {productsToDisplay.map((product: IProduct) => (
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
        ) : (
          <div className="no-results">
            <h1>No products found!</h1>
            <button className="clear-filter" onClick={handleClearFilter}>
              Clear Filtered
            </button>
          </div>
        )}
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
