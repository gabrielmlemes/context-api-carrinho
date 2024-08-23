import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";

interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductProps)=> void
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);

  // adicona item no carrinho
  function addItemCart(newItem: ProductProps) {
    
    // verifica se o item que está sendo pasado é igual ao já existente no carrinho
    const indexItem = cart.findIndex(item => item.id === newItem.id) //se for diferente vai retornar -1

    // se o item já existir (0), apenas soma mais 1 no carrinho
    if (indexItem !== -1) {
      const cartList = cart

      cartList[indexItem].amount = cartList[indexItem].amount + 1
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price

      setCart(cartList)
      return
    }

    // incluir na lista
    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price
    }

    setCart(products => [...products, data])
  }

  return (
    <CartContext.Provider value={{ cart, cartAmount: cart.length, addItemCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
