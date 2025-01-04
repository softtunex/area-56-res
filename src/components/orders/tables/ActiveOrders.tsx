import React from "react";
import { Button, Table } from "antd";
import { orderData } from "../../../data/orderData";

const ActiveOrders: React.FC = () => {
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
            status === "Incoming"
              ? "bg-blue-500 text-white"
              : status === "Processing"
              ? "bg-yellow-300 text-black"
              : "bg-purple-500 text-white"
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

  return (
    <div>
      {/* Incoming Orders */}
      <h2 className="text-lg font-bold mb-2">Incoming Orders (20)</h2>
      <Table
        columns={columns}
        dataSource={orderData["Active Orders"].filter(
          (o) => o.status === "Incoming"
        )}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "100%" }}
      />

      {/* Preparing Orders */}
      <h2 className="text-lg font-bold mb-2">Preparing Orders (20)</h2>
      <Table
        columns={columns}
        dataSource={orderData["Active Orders"].filter(
          (o) => o.status === "Preparing"
        )}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "100%" }}
      />

      {/* Ready Orders */}
      <h2 className="text-lg font-bold mb-2">Ready Orders (20)</h2>
      <Table
        columns={columns}
        dataSource={orderData["Active Orders"].filter(
          (o) => o.status === "Ready"
        )}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "100%" }}
      />
    </div>
  );
};

export default ActiveOrders;
