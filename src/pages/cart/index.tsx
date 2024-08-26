import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, total, addItemCart, removeItemCart } = useContext(CartContext);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="font-medium text-center text-2xl my-4">Meu carrinho</h1>

      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="font-medium">Seu carrinho está vazio</p>
          <Link
            to="/"
            className="bg-slate-700 px-3 p-1 text-white font-medium my-3 rounded"
          >
            Acessar produtos
          </Link>
        </div>
      )}

      {cart.map((item) => (
        <section
          className="flex items-center justify-between border-b-2 border-gray-300"
          key={item.id}
        >
          <img src={item.cover} alt="logo produto" className="w-28" />

          <strong>
            Preço: {item.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </strong>

          <div className="flex items-center justify-center gap-3">
            <button onClick={()=> removeItemCart(item)} className="bg-slate-600 px-2 text-white rounded font-medium flex items-center justify-center">
              -
            </button>
            {item.amount}
            <button onClick={()=> addItemCart(item)} className="bg-slate-600 px-2 text-white rounded font-medium flex items-center justify-center">
              +
            </button>
          </div>

          <strong className="float-right">
            SubTotal: {item.total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </strong>
        </section>
      ))}

      {cart.length !== 0 && <p className="font-bold mt-4">Total: {total}</p>}
    </div>
  );
};

export default Cart;
