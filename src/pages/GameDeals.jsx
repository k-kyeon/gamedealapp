import { useEffect, useState } from 'react';
import Search from '../components/search';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GameDeals = ({ cart, setCart }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Put React spinner
  if (loading) return <div>Loading deals...</div>;

  return (
    <div className="flex flex-col min-h-screen w-full border border-red-400 bg-blue-300">
      <div className="flex w-full justify-between items-center p-2">
        <h1 className="">Game Deals</h1>
        <Link to="/cart" className="relative">
          <div className="bg-white rounded-4xl p-2">
            <img src="shoppingcart.png" className="w-9.5 h-9.5" />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cart.length}
              </span>
            )}
          </div>
        </Link>
      </div>

      <Search />

      <ul className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
        {deals.map((deal) => (
          <li className="border rounded-2xl p-4 m-2" key={deal.dealID}>
            <img src={deal.thumb} alt={deal.title} width={100} className="w-full rounded-2xl" />
            <h3>{deal.title}</h3>
            <p>Normal Price: ${deal.normalPrice}</p>
            <p>Sale Price: ${deal.salePrice}</p>
            <div className="flex justify-between">
              <button onClick={() => addToCart(deal)} className="border rounded-xl p-0.5">
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
