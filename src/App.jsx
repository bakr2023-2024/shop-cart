import { Link, Outlet } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <>
      <div id="navbar">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default App;
