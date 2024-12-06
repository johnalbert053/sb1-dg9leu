import React from 'react';
import { CartItem } from '../types';

interface OrderSummaryProps {
  cart: CartItem[];
  appliedDiscount: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, appliedDiscount }) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = (subtotal * appliedDiscount) / 100;
  const total = subtotal - discount;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="space-y-2">
        {cart.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <span>{item.product.name} (x{item.quantity})</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {appliedDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({appliedDiscount}%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};