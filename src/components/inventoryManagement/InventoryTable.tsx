import React from "react";
import { Table, Switch } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  availability: boolean;
}

interface InventoryTableProps {
  products: Product[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ products }) => {
  const columns: ColumnsType<Product> = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center space-x-4">
          <img
            src={record.image}
            alt={record.name}
            className="w-12 h-12 rounded-md"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Sales Metrics",
      dataIndex: "id",
      key: "salesMetrics",
      render: () => (
        <div>
          <div className="text-gray-500">Low</div>
          <div>25</div>
        </div>
      ),
    },
    {
      title: "Stock",
      dataIndex: "id",
      key: "stock",
      render: () => (
        <div>
          <div className="text-gray-500">High</div>
          <div>70</div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      render: (availability) => <Switch defaultChecked={availability} />,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <span className="text-blue-500 hover:underline cursor-pointer">
          Modify
        </span>
      ),
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={columns}
      rowKey="id"
      pagination={false}
      bordered
    />
  );
};

export default InventoryTable;
