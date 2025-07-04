import { Link } from "react-router-dom";

const CartPage = ({ cart, setCart }) => {
  const removeFromCart = (dealID) => {
    setCart(cart.filter((item) => item.dealID !== dealID));
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
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.dealID} className="border rounded p-4">
              <div className="flex flex-row">
                <img src={item.thumb} />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>Sale Price: ${item.salePrice}</p>
                  <div className="flex gap-4 mt-2">
                    <a
                      href={`https://www.cheapshark.com/redirect?dealID=${item.dealID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      Buy Now
                    </a>
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
