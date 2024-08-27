import { api } from "../../services/api";
import { useState, useEffect, useContext } from "react";
import { ProductProps } from "../home";
import { useNavigate, useParams } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import toast from "react-hot-toast";
import { CartContext } from "../../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProps>();
  const { addItemCart } = useContext(CartContext);
  const navigate = useNavigate()

  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    }

    getProducts();
  }, [id]);

  function handleCartItem(product: ProductProps) {
    addItemCart(product);
    toast.success("Item adicionado ao carrinho", {
      style: {
        borderRadius: 10,
        background: "#121212",
        color: "#fff",
      },
    });
    navigate('/cart')
  }

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto py-8">
        {product && (
          <section className="w-full">
            <div className="flex flex-col lg:flex-row">
              <img
                src={product?.cover}
                alt={product?.title}
                className="flex-1 w-full max-h-72 object-contain"
              />

              <div className="flex-1">
                <p className="font-bold text-2xl mt-4 mb-1">{product?.title}</p>
                <p className="my-4">{product?.description}</p>
                <strong className="text-zinc-700/90 text-xl">
                  {product?.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <button className="bg-zinc-900 p-1 rounded ml-3" onClick={(()=> handleCartItem(product))}>
                    <BsCartPlus size={20} color="#fff"/>
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
