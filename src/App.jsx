import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import GameDeals from './pages/GameDeals';
import CartPage from './pages/CartPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { account, appwriteConfig, databases } from './lib/appwrite/config';
import AdminDashboard from './pages/AdminDashboard';
import { Query } from 'appwrite';
import PendingUserApprovals from './components/PendingUserApprovals';
import OrderHistory from './components/OrderHistory';

const App = () => {
  const [role, setRole] = useState(null);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const [sessionUpdated, setSessionUpdated] = useState(false);

  useEffect(() => {
    setSessionUpdated((prev) => !prev);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();

        // Fetch role from users collection
        const res = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          [Query.equal('accountId', user.$id)]
        );

        const userData = res.documents[0];

        if (!userData || userData.status !== 'approved') {
          await account.deleteSession('current');
          setIsAuthenticated(false);
          setRole(null);
          navigate('/sign-in');
          return;
        }

        setRole(userData.role);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        setRole(null);
        navigate('/sign-in');
      }
    };

    checkSession();
  }, [sessionUpdated]);

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
      <Route
        path="/admin-dashboard"
        element={
          <AdminDashboard
            setSessionUpdated={setSessionUpdated}
            setIsAuthenticated={setIsAuthenticated}
            setRole={setRole}
          />
        }
      />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/pending-users" element={<PendingUserApprovals />} />
      <Route path="/order-history" element={<OrderHistory />} />
    </Routes>
  );
};

export default App;
