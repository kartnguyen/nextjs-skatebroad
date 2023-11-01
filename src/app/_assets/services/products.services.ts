import useSWR from "swr";
import { fetcher } from "@/app/_assets/libs";

const ProductServices = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR<any>(`/api/products`, fetcher);

  return {
    products,
    error,
    isLoading,
  };
};

export default ProductServices;
