import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import GameDeals from './pages/GameDeals';
import CartPage from './pages/CartPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { account } from './lib/appwrite/config';
import AdminDashboard from './pages/AdminDashboard';

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
      <Route
        path="/"
        element={
          account?.role === 'customer' ? (
            <GameDeals cart={cart} setCart={setCart} />
          ) : (
            <Navigate to="/sign-in" />
          )
        }
      />
      <Route
        path="/admin-dashboard"
        element={account?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
      />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default App;
