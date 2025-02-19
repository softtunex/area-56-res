import React from "react";

interface PaymentDetailsProps {
  payment: {
    subtotal: string;
    method: string;
    pending: string;
    totalPaid: string;
  };
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ payment }) => {
  return (
    <div className="border rounded-md p-4">
      <h2 className="text-lg font-bold mb-4">Payment Details</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-black font-medium">{payment.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Payment method</span>
          <span className="text-black font-medium">{payment.method}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Pending payment (Pay on hold)</span>
          <span className="text-black font-medium">{payment.pending}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Total paid by customer</span>
          <span className="text-black font-bold">{payment.totalPaid}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
