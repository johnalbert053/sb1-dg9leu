import React from 'react';
import { Product } from '../types';
import { useStore } from '../store/useStore';

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product);
                  // Add navigation to checkout here
                }}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};