import { appwriteConfig, databases } from '@/lib/appwrite/config';
import { Query } from 'appwrite';
import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const res = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal('status', 'pending')]
      );
      setPendingUsers(res.documents);
    };

    fetchPendingUsers();
  }, []);

  const approveUser = async (userId) => {
    await databases.updateDocument(
      import.meta.env.VITE_PUBLIC_APPWRITE_DATABASE,
      import.meta.env.VITE_PUBLIC_APPWRITE_USERS_COLLECTION,
      userId,
      { status: 'approved' }
    );
    setPendingUsers((prev) => prev.filter((u) => u.$id !== userId));
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Pending User Approvals</h1>
      <ul>
        {pendingUsers.map((user) => (
          <li key={user.$id} className="flex justify-between border-b py-2">
            <div>
              <p>
                {user.name} ({user.email})
              </p>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-1 rounded"
              onClick={() => approveUser(user.$id)}
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
