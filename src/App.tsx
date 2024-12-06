import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductCarousel } from './components/ProductCarousel';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { products } from './data/products';
import { useStore } from './store/useStore';

function App() {
  const cart = useStore((state) => state.cart);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  E-Commerce Store
                </Link>
              </div>
              <div className="flex items-center">
                <Link
                  to="/cart"
                  className="flex items-center text-gray-800 hover:text-gray-600"
                >
                  🛒 Cart ({cartItemsCount})
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProductCarousel products={products} />
                  <ProductList products={products} />
                </>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;