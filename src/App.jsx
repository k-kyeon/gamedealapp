import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GameDeals from './pages/GameDeals';
import CartPage from './pages/CartPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import { Query } from 'appwrite';
import PendingUserApprovals from './components/PendingUserApprovals';
import OrderHistory from './components/OrderHistory';
import useAuthStore from './store/authStore';

const App = () => {
  const [cart, setCart] = useState([]);

  const { role, isAuthenticated, loading, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    // Try to fetch user session on app load
    fetchUser();
  }, [fetchUser]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (isAuthenticated === null) return <div className="text-center mt-20">Loading...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            role === 'customer' ? (
              <GameDeals cart={cart} setCart={setCart} />
            ) : (
              <Navigate to="/admin-dashboard" />
            )
          ) : (
            <Navigate to="/sign-in" />
          )
        }
      />
      <Route path="/admin-dashboard" element={<AdminDashboard logout={logout} />} />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/pending-users" element={<PendingUserApprovals />} />
      <Route path="/order-history" element={<OrderHistory />} />
    </Routes>
  );
};

export default App;
