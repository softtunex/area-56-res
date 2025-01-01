import React from "react";
import { useParams } from "react-router-dom";
import PaymentDetails from "../components/orders/details/PaymentDetails";
import MessageSection from "../components/orders/details/MessageSection";
import OrderDetailsTable from "../components/orders/details/OrderDetailsTable";
import CustomerInfo from "../components/orders/details/CustomerInfo";

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  // Mock Data (replace with API call)
  const orderData = {
    id: orderId,
    date: "09-10-2024",
    time: "01:34 PM",
    status: "Incoming",
    items: [
      {
        id: 1,
        name: "Red Wine",
        quantity: 1,
        vendor: "The BAR",
        amount: "₦60,000",
      },
      {
        id: 2,
        name: "Casamigos(Shots)",
        quantity: 5,
        vendor: "The BAR",
        amount: "₦60,000",
      },
      {
        id: 3,
        name: "Jollof Rice",
        quantity: 2,
        vendor: "Kilimangaro",
        amount: "₦60,000",
      },
      {
        id: 4,
        name: "Large Jumbo Pizza",
        quantity: 1,
        vendor: "Pizza Jungle",
        amount: "₦60,000",
      },
    ],
    customer: {
      name: "Emeka John",
      email: "emekajohn@gmail.com",
      phone: "08028173391",
    },
    payment: {
      subtotal: "₦60,000",
      method: "Online transfer",
      pending: "₦0",
      totalPaid: "₦60,000",
    },
    message:
      "Please add salt to the rim of the glass of the shots. I would also call extra cheese on the pizza and less pepper.",
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Back Button and Order Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-black text-6xl">←</button>
          <div className="text-left ">
            <h1 className="text-lg sm:text-3xl font-bold">
              ORDER #{orderData.id}
            </h1>
            <p className="text-sm text-gray-500">
              {orderData.date} {orderData.time}
            </p>
          </div>
        </div>
        <div className="text-left flex items-center space-x-2">
          <h6>Order Status</h6>
          <span className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm">
            {orderData.status}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Order Details and Message */}
        <div className="lg:col-span-2 space-y-6">
          <OrderDetailsTable
            data={orderData.items.map((item, index) => ({
              key: index + 1,
              item: item.name,
              quantity: `x${item.quantity}`,
              vendor: item.vendor,
              total: item.amount,
            }))}
          />
          <MessageSection message={orderData.message} />
          <div className="text-center sm:text-left">
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg flex items-center justify-center sm:justify-start">
              Confirm Order
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>

        {/* Right Section: Customer Info and Payment Details */}
        <div className="space-y-4">
          <CustomerInfo customer={orderData.customer} />
          <PaymentDetails payment={orderData.payment} />
          <button className="bg-green-500 text-white w-full py-2 mt-4 rounded-lg">
            Payment Confirmed
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
