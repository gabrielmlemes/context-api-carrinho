import { BsCartPlus } from "react-icons/bs";
import { useEffect, useState, useContext } from "react";
import { api } from "../../services/api";
import { CartContext } from "../../context/CartContext";

export interface ProductProps {
  id: number
  title: string
  description: string
  price: number
  cover: string
}

const Home = () => {

  const {addItemCart} = useContext(CartContext)

  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }

    getProducts();
  }, []);

  function handleCartItem(product: ProductProps) {
    addItemCart(product)
    
  }

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto py-4">
        <h1 className="font-bold text-2xl mb-4 text-center mt-5 ">
          Produtos em alta
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {products.map((product) => (
            <section className="w-full" key={product.id}>
              <img
                src={product.cover}
                alt={product.title}
                className="w-full rounded-lg max-w-70"
              />
              <p className="font-medium mt-1 mb-2">{product.title}</p>
              <div className="flex gap-3 items-center">
                <strong className="text-zinc-700/90">{product.price.toLocaleString( "pt-BR", {
                    style: 'currency',
                    currency: 'BRL'
                  }
                )}</strong>
                <button className="bg-zinc-900 p-1 rounded" onClick={()=> handleCartItem(product)}>
                  <BsCartPlus size={20} color="#fff" />
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
