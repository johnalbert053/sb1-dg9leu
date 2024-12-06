import React from 'react';

interface OrderProgressProps {
  currentStep: 'placed' | 'preparing' | 'delivering' | 'received';
}

export const OrderProgress: React.FC<OrderProgressProps> = ({ currentStep }) => {
  const steps = [
    { id: 'placed', label: 'Order Placed' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'delivering', label: 'Delivering' },
    { id: 'received', label: 'Order Received' },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  return (
    <div className="w-full py-6">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="relative flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= getCurrentStepIndex()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <div className="text-sm mt-2">{step.label}</div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 w-full h-0.5 ${
                    index < getCurrentStepIndex() ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  style={{ left: '50%', transform: 'translateX(0%)' }}
                />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};