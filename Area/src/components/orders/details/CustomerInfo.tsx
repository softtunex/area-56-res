import React from "react";

interface CustomerInfoProps {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => {
  return (
    <div className="border rounded-md p-4 mb-4">
      <h2 className="text-lg font-bold mb-4">Customer Information</h2>
      <div className="space-y-2">
        <p>
          <span className="text-gray-500 block text-sm">Name</span>
          <span className="text-black font-medium">{customer.name}</span>
        </p>
        <p>
          <span className="text-gray-500 block text-sm">Email</span>
          <span className="text-black font-medium">{customer.email}</span>
        </p>
        <p>
          <span className="text-gray-500 block text-sm">Phone number</span>
          <span className="text-black font-medium">{customer.phone}</span>
        </p>
      </div>
    </div>
  );
};

export default CustomerInfo;
