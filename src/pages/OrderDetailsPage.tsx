import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaymentDetails from "../components/orders/details/PaymentDetails";
import MessageSection from "../components/orders/details/MessageSection";
import OrderDetailsTable from "../components/orders/details/OrderDetailsTable";
import CustomerInfo from "../components/orders/details/CustomerInfo";
import OrderCompletionModal from "../components/orders/details/OrderCompletionModal";
import ActivityLog from "../components/orders/details/ActivityLog";
import { orderDetailsData as defaultOrderDetailsData } from "../data/orderDetailsData";
import { useOrderDetails } from "../hooks/useOrders";
import { usePayment } from "../hooks/usePayments";
import { Spin } from "antd";

const initialActivityLog = [
  {
    time: "4:27 pm",
    title: "Order Placed",
    description: [
      { time: "4:27 pm", text: "Customer successfully placed order" },
    ],
    color: "#E3F2FD", // Light Blue
    icon: "📦",
  },
];

const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading: orderLoading } = useOrderDetails(
    Number(orderId)
  );
  const { data: payment, isLoading: paymentLoading } = usePayment(
    Number(orderId)
  );
  const navigate = useNavigate();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isOrderReady, setIsOrderReady] = useState(false);
  const [isOrderClosed, setIsOrderClosed] = useState(false); // New state for order closure
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityLog, setActivityLog] = useState(initialActivityLog);

  if (orderLoading || paymentLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spin size="large" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  const orderDetailsData = {
    ...defaultOrderDetailsData,
    id: orderId || defaultOrderDetailsData.id,
    status: isOrderClosed
      ? "Closed"
      : isOrderReady
      ? "Ready"
      : isOrderConfirmed
      ? "Processing"
      : "Incoming",
    statusColor: isOrderClosed
      ? "bg-green-100 text-green-500"
      : isOrderReady
      ? "bg-purple-100 text-purple-500"
      : isOrderConfirmed
      ? "bg-yellow-100 text-yellow-500"
      : "bg-blue-100 text-blue-500",
  };

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true);
    setActivityLog((prev) => [
      ...prev,
      {
        time: "4:29 pm",
        title: "Order Confirmed",
        description: [
          { time: "4:29 pm", text: "Order was confirmed to be available" },
        ],
        color: "#C8E6C9", // Light Green
        icon: "✅",
      },
    ]);
  };

  const handleMoveToReady = () => {
    setIsOrderReady(true);
    setActivityLog((prev) => [
      ...prev,
      {
        time: "4:30 pm",
        title: "Preparation",
        description: [
          { time: "4:30 pm", text: "Order forwarded to process station" },
          { time: "4:31 pm", text: "Order is being prepared" },
        ],
        color: "#FFF9C4", // Light Yellow
        icon: "⚙️",
      },
      {
        time: "4:32 pm",
        title: "Order Ready",
        description: [
          { time: "4:32 pm", text: "Order is confirmed to be ready" },
          { time: "4:33 pm", text: "Order is picked up" },
        ],
        color: "#FFCDD2", // Light Red
        icon: "🔔",
      },
    ]);
  };

  const handleCompleteOrder = () => {
    setIsModalOpen(false);
    setIsOrderClosed(true); // Mark order as closed
    setActivityLog((prev) => [
      ...prev,
      {
        time: "4:33 pm",
        title: "Order Closed",
        description: [{ time: "4:33 pm", text: "Order is closed" }],
        color: "#C5E1A5", // Light Green
        icon: "✔️",
      },
    ]);
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-black text-6xl"
          >
            ←
          </button>
          <div className="text-left">
            <h1 className="text-lg sm:text-3xl font-bold">
              ORDER #{order.reference}
            </h1>
            <p className="text-sm text-gray-500">
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-left flex items-center space-x-2">
          <h6>Order Status</h6>
          <span
            className={`px-3 py-1 rounded-full text-sm ${orderDetailsData.statusColor}`}
          >
            {order.order_status.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OrderDetailsTable orderItems={order.order_items} />
          <MessageSection message={orderDetailsData.message} />
          <ActivityLog activities={activityLog} />
          <div className="text-center sm:text-left">
            {!isOrderClosed && ( // Do not display buttons if the order is closed
              <>
                {!isOrderConfirmed ? (
                  <button
                    className="bg-primary text-white px-6 py-2 rounded-lg flex items-center justify-center sm:justify-start"
                    onClick={handleConfirmOrder}
                  >
                    Confirm Order
                    <span className="ml-2">→</span>
                  </button>
                ) : !isOrderReady ? (
                  <div className="flex justify-between">
                    <button className="border border-black text-black px-6 py-2 rounded-lg flex items-center">
                      ← Back
                    </button>
                    <button
                      className="bg-primary text-white px-6 py-2 rounded-lg flex items-center"
                      onClick={handleMoveToReady}
                    >
                      Move to Ready →
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <button className="border border-black text-black px-6 py-2 rounded-lg flex items-center">
                      ← Back
                    </button>
                    <button
                      className="bg-primary text-white px-6 py-2 rounded-lg flex items-center"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Close Order →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <CustomerInfo customer={order.user} />
          <PaymentDetails payment={payment} />
          <button className="bg-green-500 text-white w-full py-2 mt-4 rounded-lg">
            Payment Confirmed
          </button>
        </div>
      </div>

      <OrderCompletionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCompleteOrder}
      />
    </div>
  );
};

export default OrderDetailsPage;
