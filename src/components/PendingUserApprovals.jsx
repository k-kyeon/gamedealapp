import { appwriteConfig, databases } from '@/lib/appwrite/config';
import { Query } from 'appwrite';
import React, { useEffect, useState } from 'react';

const PendingUserApprovals = () => {
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
    <ul className="border-red-500 border">
      <h1 className="text-lg">Pending User Approvals</h1>
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
          <button className="bg-red-500">Deny</button>
        </li>
      ))}
    </ul>
  );
};

export default PendingUserApprovals;
