import { useEffect, useState } from 'react';
import Search from '../components/search';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { account } from '@/lib/appwrite/config';

const GameDeals = ({ cart, setCart }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(
          'https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=10'
        );
        setDeals(response.data);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const addToCart = (deal) => {
    const existingItem = cart.find((item) => item.dealID === deal.dealID);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.dealID === deal.dealID ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...deal, quantity: 1 }]);
    }
  };

  const handleSignOut = async () => {
    await account.deleteSession('current');
    navigate('/sign-in');
  };

  // Put React spinner
  if (loading) return <div>Loading deals...</div>;

  return (
    <div className="flex flex-col min-h-screen w-full border border-red-400 bg-sky-100 p-3">
      <div className="flex w-full justify-between items-center p-2 mb-9">
        <h1 className="text-6xl font-extralight">Game Deals</h1>
        <div className="flex flex-row justify-between items-center space-x-4">
          <img src="profile.png" className="w-6 h-6" />

          <Link to="/cart" className="relative flex-shrink-0">
            <div className="rounded-4xl p-2">
              <img src="shoppingcart.png" className="w-6 h-6 flex-shrink-0" />

              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cart.length}
                </span>
              )}
            </div>
          </Link>
          <button onClick={handleSignOut} className="bg-red-300 border border-rose-400 rounded-4xl">
            Sign Out
          </button>
        </div>
      </div>

      <Search />

      <ul className="mt-4 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        {deals.map((deal) => (
          <li
            className="flex flex-col justify-between border rounded-2xl p-4 m-2 shadow-md shadow-[#060f22] bg-[#0b1830ec]"
            key={deal.dealID}
          >
            <img src={deal.thumb} alt={deal.title} className="w-full rounded-2xl h-50" />
            <div className="mt-2 ml-1 flex-grow">
              <h3 className="text-2xl text-white font-semibold font-[Helvetica] border-t-2 border-gray-100 mt-1">
                {deal.title}
              </h3>
              <p className="text-white">Normal Price: ${deal.normalPrice}</p>
              <p className="text-white">
                Sale Price: <span className="font-medium text-[#19f3bde7]">${deal.salePrice}</span>
              </p>
            </div>
            <div className="self-end">
              <button
                onClick={() => addToCart(deal)}
                className="border rounded-full bg-gray-200 mt-4"
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameDeals;
