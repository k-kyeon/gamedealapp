import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GameDeals from './pages/GameDeals';
import CartPage from './pages/CartPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { account } from './lib/appwrite/config';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        navigate('/sign-in');
      }
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) return <div className="text-center mt-20">Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<GameDeals cart={cart} setCart={setCart} />} />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default App;
