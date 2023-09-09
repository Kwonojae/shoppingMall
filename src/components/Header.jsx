import { BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "./context/AuthContext";
import CartStatus from "./CartStatus";

export default function Header() {
  const { user, login, logout } = useAuthContext();
  return (
    <header className="flex justify-between border-b border-gray-300 w-full p-2">
      <Link className="flex items-center text-brand text-4xl" to="/">
        <img src="/shopImage.ico" alt="Shoppy" />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        {user && (
          <Link to="/cart">
            <CartStatus />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={"Login"} onClick={login}></Button>}
        {user && <Button text={"Logout"} onClick={logout}></Button>}
      </nav>
    </header>
  );
}
