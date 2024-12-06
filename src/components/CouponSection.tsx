import React, { useState } from 'react';

interface CouponSectionProps {
  onApplyCoupon: (code: string) => void;
}

export const CouponSection: React.FC<CouponSectionProps> = ({ onApplyCoupon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode);
      setCouponCode('');
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        {isExpanded ? '- Hide Coupon' : '+ Add Coupon'}
      </button>
      
      {isExpanded && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};