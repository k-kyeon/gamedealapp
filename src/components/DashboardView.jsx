import { appwriteConfig, databases } from '@/lib/appwrite/config';
import { Query } from 'appwrite';
import React, { useEffect, useState } from 'react';

const DashboardView = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          [Query.equal('role', ['customer'])]
        );

        const ordersRes = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.ordersCollectionId
        );

        setStats({ totalUsers: usersRes.total, totalOrders: ordersRes.total, loading: false });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
        <p className="text-gray-700">Total Customers</p>
      </div>
      <div className="bg-green-100 p-4 rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold">{stats.totalOrders}</h2>
        <p className="text-gray-700">Total Orders</p>
      </div>
    </div>
  );
};

export default DashboardView;
