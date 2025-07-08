import { Link } from 'react-router-dom';

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

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 underline">
        ← Back to Deals
      </Link>
      <h2 className="text-2xl font-bold my-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            <p>Total items: {cart.length}</p>
            {cart.map((item) => (
              <>
                <li key={item.dealID} className="border rounded p-4">
                  <div className="flex flex-row">
                    <img src={item.thumb} className="w-40 h-30 mr-3" />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p>Sale Price: ${item.salePrice}</p>
                      <div className="flex gap-4 mt-2 items-center">
                        <button onClick={() => increaseQuantity(item.dealID)}>+</button>
                        <p>{item.quantity}</p>
                        <button onClick={() => decreaseQuantity(item.dealID)}>-</button>
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
          <div className="flex flex-row mt-8">
            <div>
              <p className=" font-bold text-lg mr-10">
                Total Price: $
                {cart
                  .reduce((sum, item) => sum + item.quantity * parseFloat(item.salePrice), 0)
                  .toFixed(2)}
              </p>
              <p>*Tax not included*</p>
            </div>
            <button>Continue</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
