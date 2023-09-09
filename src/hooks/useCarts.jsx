import { useMutation, useQuery, useQueryClient } from "react-query";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";

export default function useCarts() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(["carts", uid || ""], () => getCart(uid), {
    enabled: !!uid, //사용자가 없는경우 이 쿼리가 수행되지 않도록 uid가존재할경우에만 이게 실행됨
  });

  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),
    {
      //로그인한 사용자만 캐시해주고있음 .
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
    }
  );

  const removeItem = useMutation((id) => removeFromCart(uid, id), {
    onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
