import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { useState } from "react";
import { Home, Shop, Cart } from "./components";
const Router = () => {
  const [cart, setItems] = useState({ items: [] });
  const addNewItem = (item) => {
    if (cart.items.find((i) => i.id === item.id)) {
      return;
    } else {
      setItems((prevCart) => ({
        items: [...prevCart.items, { ...item, count: 1 }],
      }));
    }
  };
  const setItemCount = (item, inc) => {
    const data = cart.items;
    const idx = data.findIndex((el) => el.id === item.id);
    data[idx].count = inc
      ? data[idx].count + 1
      : data[idx].count === 0
      ? 0
      : data[idx].count - 1;
    setItems(() => ({
      items: [...data],
    }));
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/shop",
          element: <Shop addNewItem={addNewItem} />,
        },
        {
          path: "/cart",
          element: <Cart setItemCount={setItemCount} items={cart.items} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
