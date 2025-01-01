import React from "react";
import { Table } from "antd";

interface OrderDetailsTableProps {
  data: {
    key: number;
    item: string;
    quantity: string;
    vendor: string;
    total: string;
  }[];
}

const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({ data }) => {
  const columns = [
    {
      title: "S/N",
      dataIndex: "key",
      key: "key",
      render: (key: number) => <span>{key}</span>,
    },
    {
      title: "Items",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      render: (vendor: string) => (
        <span className="text-green-500 font-medium">{vendor}</span>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <h2 className="text-lg font-bold mb-4">Order Details</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        className="rounded-md"
      />
    </div>
  );
};

export default OrderDetailsTable;
