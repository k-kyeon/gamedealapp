import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameDeals from "./pages/GameDeals";
import CartPage from "./pages/CartPage";

const App = () => {
  const [cart, setCart] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameDeals cart={cart} setCart={setCart} />} />
        <Route
          path="/cart"
          element={<CartPage cart={cart} setCart={setCart} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
