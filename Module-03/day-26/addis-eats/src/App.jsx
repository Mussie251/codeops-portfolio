import { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Menu from "./component/Main/Menu/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import NotFound from "./pages/NotFound.jsx";

const DishDetail = lazy(() => import("./pages/DishDetail.jsx"));

function ErrorFallback() {
  return (
    <main>
      <h1>Something went wrong.</h1>
      <Link to="/">Return Home</Link>
    </main>
  );
}

function App() {
  return (
    <div className="app">
      <header>
        <h1>Addis Eats</h1>
        <p>Authentic Ethiopian food, made with love.</p>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </header>

      <main>
        <Suspense fallback={<p>Loading page...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<DishDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
