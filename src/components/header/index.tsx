import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext } from 'react';

import {CartContext}  from "../../context/CartContext";

const Header = () => {
  const { cartAmount } = useContext(CartContext);

  return (
    <header className="w-full px-1 bg-slate-200">
      <nav className="flex items-center justify-between h-14 w-full max-w-7xl px-5 mx-auto">
        <Link to="/" className="font-bold text-2xl">
          DevShop
        </Link>

        <Link to="/cart" className="relative">
          <FiShoppingCart size={24} color="#121212" />
          {cartAmount > 0 && (
            <span className="bg-sky-500 absolute px-2.5 w-6 h-6 flex text-white text-xs -right-3 -top-3 items-center justify-center rounded-full">
              {cartAmount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
