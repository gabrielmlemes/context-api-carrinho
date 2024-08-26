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
  addItemCart: (newItem: ProductProps) => void;
  removeItemCart: (product: CartProps)=> void
  total: string
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState('')

  // adicona item no carrinho
  function addItemCart(newItem: ProductProps) {
    // verifica se o item que está sendo pasado é igual ao já existente no carrinho
    const indexItem = cart.findIndex((item) => item.id === newItem.id); //se for diferente vai retornar -1

    // se o item já existir (0), apenas soma mais 1 no carrinho
    if (indexItem !== -1) {
      const cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;

      setCart(cartList);
      totalResult(cartList)
      return;
    }

    // incluir na lista
    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((products) => [...products, data]);
    totalResult([...cart, data])
  }

  // remove item do carrinho
  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex((item) => item.id === product.id);

    // se a quantidade de itens no carrinho for maior que 1, apenas remova a quantidade
    if (cart[indexItem]?.amount > 1) {
      const cartList = cart
      cartList[indexItem].amount = cartList[indexItem].amount - 1;
      cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price

      setCart(cartList)
      totalResult(cartList)
      return
    }

    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
    totalResult(removeItem)
  }

  function totalResult(items: CartProps[]) {
    const myCart = items;
    const result = myCart.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);
    const formatedResult = result.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setTotal(formatedResult)

  }

  return (
    <CartContext.Provider
      value={{ cart, cartAmount: cart.length, addItemCart, removeItemCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
