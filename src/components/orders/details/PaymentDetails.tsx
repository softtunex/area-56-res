import React from "react";

interface PaymentDetailsProps {
  payment?: {
    amount: string;
    payment_method: string;
    tax: string;
    fee: string; // Assuming fee represents distance charge
  } | null;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ payment }) => {
  const formattedPaymentData = payment
    ? {
        subtotal: `₦${payment.amount}`,
        method: payment.payment_method,
        tax: `₦${payment.tax}`,
        distance: `₦${payment.fee}`, // Assuming "fee" represents distance charge
        pending: `₦${payment.tax}`, // Assuming tax represents pending amount
        totalPaid: `₦${(
          parseFloat(payment.amount) - parseFloat(payment.tax)
        ).toFixed(2)}`,
      }
    : {
        subtotal: "N/A",
        method: "N/A",
        tax: "N/A",
        distance: "N/A",
        pending: "N/A",
        totalPaid: "N/A",
      };

  return (
    <div className="border rounded-md p-4">
      <h2 className="text-lg font-bold mb-4">Payment Details</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-black font-medium">
            {formattedPaymentData.subtotal}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Payment method</span>
          <span className="text-black font-medium">
            {formattedPaymentData.method}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tax</span>
          <span className="text-black font-medium">
            {formattedPaymentData.tax}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Distance Fee</span>
          <span className="text-black font-medium">
            {formattedPaymentData.distance}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Pending payment (Pay on hold)</span>
          <span className="text-black font-medium">
            {formattedPaymentData.pending}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Total paid by customer</span>
          <span className="text-black font-bold">
            {formattedPaymentData.totalPaid}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
