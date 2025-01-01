import React from "react";
import { Table, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";

// Define the Product type
interface Product {
  id: number;
  name: string;
  image: string;
  quantity: number;
  selected: boolean;
  price: string;
  availability: boolean;
}

interface InventoryTableProps {
  products: Product[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ products }) => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Product) => (
        <div className="flex items-center space-x-2">
          <img src={record.image} alt={text} className="w-10 h-10 rounded-md" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Sales Metrics",
      dataIndex: "salesMetrics",
      key: "salesMetrics",
      render: () => (
        <div className="flex items-center space-x-1">
          <span>Low</span>
          <span className="text-gray-500">25</span>
        </div>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: () => (
        <div className="flex items-center space-x-1">
          <span>High</span>
          <span className="text-gray-500">70</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      render: (available: boolean) => <Switch defaultChecked={available} />,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <a className="text-blue-500 hover:underline flex items-center space-x-1">
          <EditOutlined />
          <span>Modify</span>
        </a>
      ),
    },
  ];

  return (
    <Table
      dataSource={products.map((product) => ({ ...product, key: product.id }))}
      columns={columns}
      pagination={{ pageSize: 8 }}
      bordered
    />
  );
};

export default InventoryTable;
