import { useState, useEffect } from "react";
import PropTypes from "prop-types";
const url = "https://fakestoreapi.com/products/";
const Home = () => {
  return (
    <div>
      <h1>This is my shop</h1>
      <p>Welcome!!!</p>
    </div>
  );
};
const Shop = ({ addNewItem }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const promises = [];
      for (let i = 1; i <= 16; i++) {
        const res = await fetch(url + i, { mode: "cors" });
        const json = await res.json();
        promises.push(json);
      }
      const data = await Promise.all(promises);
      setLoading(false);
      setProducts(data);
    };
    fetchData();
  }, []);
if(loading)return <div className="loading"></div>
  return (
    <div className="cards">
      {products
        ? products.map((product) => (
            <div key={product.id} className="card">
              <img src={product.image} />
              <h3>{product.title}</h3>
              <h6>{product.description}</h6>
              <h5>{"$" + product.price}</h5>
              <button
                onClick={() => {
                  addNewItem(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        : null}
    </div>
  );
};
Shop.propTypes = {
  addNewItem: PropTypes.func,
};
const Cart = ({ items, setItemCount }) => {
  const [price, setPrice] = useState(0);
  useEffect(() => {
    setPrice(items.reduce((sum, curr) => sum + curr.price * curr.count, 0));
  }, []);
  return (
    <>
      <div className="cards">
        {items.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} />
            <h5>{item.title}</h5>
            <button
              onClick={() => {
                setItemCount(item, false);
                setPrice(
                  items.reduce((sum, curr) => sum + curr.price * curr.count, 0)
                );
              }}
            >
              -
            </button>
            <span>{item.count}</span>
            <button
              onClick={() => {
                setItemCount(item, true);
                setPrice(
                  items.reduce((sum, curr) => sum + curr.price * curr.count, 0)
                );
              }}
            >
              +
            </button>
          </div>
        ))}
      </div>
      <h3>Total: ${price}</h3>
    </>
  );
};
Cart.propTypes = {
  items: PropTypes.array,
  setItemCount: PropTypes.func,
};
export { Home, Shop, Cart };
