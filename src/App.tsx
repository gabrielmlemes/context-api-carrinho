import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Layout from "./components/layout";
import ProductDetail from "./pages/detalhes";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/products/:id',
        element: <ProductDetail/>
      }
    ]

  }
])

export {router}