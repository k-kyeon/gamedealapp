import { appwriteConfig, databases } from '@/lib/appwrite/config';
import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.ordersCollectionId
        );

        setOrders(res.documents);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this order? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        orderId
      );

      setOrders((prev) => prev.filter((order) => order.$id !== orderId));
      alert('Order deleted successfully');
    } catch (error) {
      console.error('Failed to delete order', error);
      alert('Failed to delete order. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Order History</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.$id} className="mb-4 border p-2 rounded">
            <div className="flex flex-row justify-between">
              <p className="font-semibold">User Name: {order.buyer}</p>
              <button onClick={() => handleDelete(order.$id)} className="text-red-500">
                Cancel
              </button>
            </div>
            <p>Items:</p>
            <ul className="pl-4 list-disc">
              {order.items.map((itemStr, index) => {
                let item;
                try {
                  item = JSON.parse(itemStr);
                } catch (error) {
                  console.error('Failed to parse item:', itemStr);
                  return null;
                }

                return (
                  <li key={index}>
                    {item.title} — ${item.salePrice}
                  </li>
                );
              })}
            </ul>
            <p className="text-sm mt-1">Total: ${(order.totalPrice / 100).toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">
              Ordered at: {new Date(order.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
