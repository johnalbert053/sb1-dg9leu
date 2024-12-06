import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CouponSection } from './CouponSection';
import { OrderProgress } from './OrderProgress';
import { OrderSummary } from './OrderSummary';

const paymentMethods = [
  { id: 'credit', name: 'Credit Card', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
];

export const CheckoutForm: React.FC = () => {
  const { cart, clearCart } = useStore();
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [orderStatus, setOrderStatus] = useState<'placed' | 'preparing' | 'delivering' | 'received'>('placed');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    setOrderStatus('placed');
    setTimeout(() => setOrderStatus('preparing'), 2000);
    setTimeout(() => setOrderStatus('delivering'), 4000);
    setTimeout(() => setOrderStatus('received'), 6000);
    clearCart();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (code: string) => {
    // Simulate coupon validation
    if (code.toLowerCase() === 'discount20') {
      setAppliedDiscount(20);
    } else if (code.toLowerCase() === 'save10') {
      setAppliedDiscount(10);
    } else {
      alert('Invalid coupon code');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <OrderProgress currentStep={orderStatus} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <CouponSection onApplyCoupon={handleApplyCoupon} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 border rounded-lg text-center ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <p className="mt-1 text-sm">{method.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>

        <div>
          <OrderSummary cart={cart} appliedDiscount={appliedDiscount} />
        </div>
      </div>
    </div>
  );
};