import AdminSidebar from '@/components/AdminSidebar';
import { account } from '@/lib/appwrite/config';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import PendingUserApprovals from '@/components/PendingUserApprovals';
import DashboardView from '@/components/DashboardView';
import OrderHistory from '@/components/OrderHistory';

const AdminDashboard = ({ setSessionUpdated, setRole, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await account.deleteSession('current');
    } catch (err) {
      console.error('Failed to delete session', err);
    }

    setRole(null);
    setIsAuthenticated(false);

    setTimeout(() => {
      setSessionUpdated((prev) => !prev); // Trigger session check
      navigate('/sign-in');
    }, 100);
  };

  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardView />;
      case 'pending-users':
        return <PendingUserApprovals />;
      case 'order-history':
        return <OrderHistory />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex flex-col p-10 min-h-screen bg-gray-600">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-between items-center gap-x-4">
          <Home />
          <h1>Company</h1>
        </div>

        <button onClick={handleSignOut} className=" bg-red-300  rounded-4xl">
          Sign Out
        </button>
      </div>

      <h1 className="text-xl font-bold text-gray-200 mt-4 mb-3">Welcome Admin</h1>

      <div className="flex w-full gap-x-3 min-h-screen">
        <div>
          <AdminSidebar activePage={activePage} setActivePage={setActivePage} />
        </div>
        <div className="flex-1 bg-gray-100 p-6 rounded-xl">{renderPage()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
