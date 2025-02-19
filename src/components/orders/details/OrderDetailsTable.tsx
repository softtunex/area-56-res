import React from "react";
import { Table } from "antd";

interface OrderDetailsTableProps {
  orderItems: {
    id: number;
    product: {
      name: string;
      vendor?: { name: string };
    };
    qty: number;
    amount: string;
  }[];
}

const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({
  orderItems,
}) => {
  const columns = [
    {
      title: "S/N",
      dataIndex: "id",
      key: "id",
      render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
    },
    {
      title: "Item Name",
      dataIndex: "product",
      key: "product",
      render: (product: { name: string }) => product?.name || "N/A",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
      render: (qty: number) => `x${qty}`,
    },
    {
      title: "Vendor",
      dataIndex: "product",
      key: "vendor",
      render: (product: { vendor?: { name: string } }) => (
        <span className="text-green-500 font-medium">
          {product?.vendor?.name || "Unknown Vendor"}
        </span>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: string) => `₦${parseFloat(amount).toLocaleString()}`,
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <h2 className="text-lg font-bold mb-4">Order Details</h2>
      <Table
        columns={columns}
        dataSource={orderItems}
        rowKey="id"
        pagination={false}
        bordered
        className="rounded-md"
      />
    </div>
  );
};

export default OrderDetailsTable;
