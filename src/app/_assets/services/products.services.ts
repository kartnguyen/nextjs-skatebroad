import { fetcher } from "@/app/_assets/libs";
import useSWR from "swr";

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
