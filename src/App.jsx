import { useEffect, useState } from "react";
import axios from "axios";

const GameDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(
          "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=10"
        );
        setDeals(response.data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) return <div>Loading deals...</div>;

  return (
    <div>
      <h1 className="">Game Deals</h1>
      <ul className="grid grid-cols-3">
        {deals.map((deal) => (
          <li className="border rounded-2xl p-4 m-2" key={deal.dealID}>
            <img
              src={deal.thumb}
              alt={deal.title}
              width={100}
              className="w-full rounded-2xl"
            />
            <h3>{deal.title}</h3>
            <p>Normal Price: ${deal.normalPrice}</p>
            <p>Sale Price: ${deal.salePrice}</p>
            <a
              href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameDeals;
