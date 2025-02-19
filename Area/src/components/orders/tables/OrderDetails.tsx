import React from "react";
import { Button, Table } from "antd";
import { orderData } from "../../../data/orderData";

interface OrderDetailsProps {
  orderType: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderType }) => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Table No.",
      dataIndex: "tableNo",
      key: "tableNo",
      render: (tableNo: string) => (
        <Button className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs">
          {tableNo}
        </Button>
      ),
    },
    {
      title: "Time of Order",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "Served"
              ? "bg-pink-300 text-white"
              : status === "Canceled"
              ? "bg-red-500 text-white"
              : status === "Completed"
              ? "bg-green-500 text-white"
              : status === "Unconfirmed Payment"
              ? "bg-yellow-300 text-black"
              : ""
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "Items Number",
      dataIndex: "itemCount",
      key: "itemCount",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            paymentStatus === "Paid" ? "text-green-500" : "text-red-500"
          }`}
        >
          {paymentStatus}
        </span>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <a
          href={`/orders/${record.id}`}
          className="text-blue-500 hover:underline"
        >
          View
        </a>
      ),
    },
  ];

  const data = orderData[orderType] || [];

  return (
    <div>
      {data.length > 0 ? (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "100%" }}
        />
      ) : (
        <h2 className="text-center text-gray-500">No {orderType} Orders</h2>
      )}
    </div>
  );
};

export default OrderDetails;
