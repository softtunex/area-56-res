import React from "react";
import { Table } from "antd";

interface StockItem {
  id: number;
  name: string;
  image: string;
  lowStock: number;
  highStock: number;
  price: string;
}

interface Props {
  data: StockItem[];
}

const StockAvailabilityTable: React.FC<Props> = ({ data }) => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: StockItem) => (
        <div className="flex items-center space-x-3">
          <img src={record.image} alt={text} className="w-10 h-10 rounded-md" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Sales Metrics",
      children: [
        {
          title: "Low",
          dataIndex: "lowStock",
          key: "lowStock",
          align: "center" as const, // Explicitly set align to valid value
        },
        {
          title: "High",
          dataIndex: "highStock",
          key: "highStock",
          align: "center" as const, // Explicitly set align to valid value
        },
      ],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center" as const, // Explicitly set align to valid value
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default StockAvailabilityTable;
