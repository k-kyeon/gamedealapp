import { Link } from 'react-router-dom';
import { account, databases, appwriteConfig } from '../lib/appwrite/config';
import { ID } from 'appwrite';

const CartPage = ({ cart, setCart }) => {
  const removeFromCart = (dealID) => {
    setCart(cart.filter((item) => item.dealID !== dealID));
  };

  const increaseQuantity = (dealID) => {
    setCart(
      cart.map((item) => (item.dealID === dealID ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQuantity = (dealID) => {
    setCart(
      cart.map((item) =>
        item.dealID === dealID ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };

  const handlePlaceOrder = async () => {
    try {
      const user = await account.get();

      // Optional: Add a check for empty cart
      if (cart.length === 0) {
        alert('Cart is empty.');
        return;
      }

      const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.salePrice), 0);

      const response = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        ID.unique(),
        {
          accountId: user.$id,
          items: cart.map((item) => JSON.stringify(item)),
          createdAt: new Date().toISOString(),
          totalPrice: Math.round(totalPrice * 100),
          buyer: user.name,
        }
      );

      console.log('Order Placed:', response);

      // Clear cart after order
      setCart([]);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Order error:', error);
      alert(`Failed to place order: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="p-4 bg-sky-100 min-h-screen">
      <Link to="/" className="text-blue-500 underline">
        ← Back to Deals
      </Link>
      <h2 className="text-2xl font-bold my-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            <p className="font-[Helvetica] font-bold">Total items: {cart.length}</p>
            {cart.map((item) => (
              <>
                <li
                  key={item.dealID}
                  className="border rounded-2xl p-4 shadow shadow-black bg-white md:w-2/3 lg:w-2/5"
                >
                  <div className="flex flex-row">
                    <img src={item.thumb} className="w-40 h-30 mr-4 border-2 p-0.5" />

                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p>Sale Price: ${item.salePrice}</p>
                      <div className="flex flex-row">
                        <div className="flex gap-4 mt-2 items-center border-1 rounded-4xl bg-gray-300">
                          <button
                            onClick={() => increaseQuantity(item.dealID)}
                            className="rounded-full border border-black bg-white"
                          >
                            +
                          </button>
                          <p>{item.quantity}</p>
                          <button
                            onClick={() => decreaseQuantity(item.dealID)}
                            className="rounded-full border border-black bg-white"
                          >
                            -
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.dealID)}
                          className="text-red-500 underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ))}
          </ul>
          <div className="mt-5 border-stone-700 border"></div>
          <div className="flex flex-row mt-4">
            <div className="mt-2">
              <p className=" font-bold text-lg mr-10">
                Total Price: $
                {cart
                  .reduce((sum, item) => sum + item.quantity * parseFloat(item.salePrice), 0)
                  .toFixed(2)}
              </p>
              <p>*Tax not included*</p>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="bg-white rounded-4xl border shadow shadow-black"
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
