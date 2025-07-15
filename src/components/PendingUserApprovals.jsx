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
    <ul className="">
      <h1 className="text-lg mb-5">Pending User Approvals</h1>
      {pendingUsers.map((user) => (
        <li
          key={user.$id}
          className="flex justify-between border border-gray-400 bg-gray-200 rounded-xl p-3"
        >
          <div>
            <p>
              {user.name} ({user.email})
            </p>
          </div>

          <div className="flex flex-row justify-between gap-x-2">
            <button
              className="bg-green-400 text-gray-900 rounded-2xl"
              onClick={() => approveUser(user.$id)}
            >
              Approve
            </button>
            <button className="bg-red-400 text-gray-900 rounded-2xl">Deny</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PendingUserApprovals;
