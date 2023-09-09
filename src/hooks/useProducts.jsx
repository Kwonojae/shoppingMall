import { useMutation, useQuery, useQueryClient } from "react-query";
import { addNewProduct, getProduct } from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(["products"], getProduct, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );
  return { productsQuery, addProduct };
}
