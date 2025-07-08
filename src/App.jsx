import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameDeals from './pages/GameDeals';
import CartPage from './pages/CartPage';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <GameDeals cart={cart} setCart={setCart} />
            </SignedIn>
            <SignedOut>
              <SignIn />
            </SignedOut>
          </>
        }
      />

      <Route
        path="/cart"
        element={
          <>
            <SignedIn>
              <CartPage cart={cart} setCart={setCart} />
            </SignedIn>
          </>
        }
      />
    </Routes>
  );
};

export default App;
