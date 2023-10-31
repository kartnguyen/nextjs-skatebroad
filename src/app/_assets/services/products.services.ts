import useSWR from "swr";
import { fetcher } from "@/app/_assets/libs";
import { IProduct } from "../types/product";

const ProductServices = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR<any>(`/api/products`, fetcher);

  const findProductById = (id: number) => {
    return products.find((product: IProduct) => product.id == id);
  };
  return {
    products,
    error,
    isLoading,
    findProductById,
  };
};

export default ProductServices;
