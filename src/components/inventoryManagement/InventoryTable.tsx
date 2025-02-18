import React, { useState } from "react";
import { Table, Tag, Pagination, Avatar, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useProducts } from "../../hooks/useProducts";

interface InventoryTableProps {
  onModifyProduct: (product: any) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ onModifyProduct }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsData, isLoading } = useProducts(currentPage);

  // ✅ Transform data inside the table (like UserTable does)
  const products =
    productsData?.data?.map((product) => ({
      id: product.id,
      name: product.name,
      image: product.image?.url || "/placeholder.png",
      price: `₦${product.amount}`,
      qty: product.qty,
      availability: product.qty > 0,
      category: product.category?.name || "Unknown",
      vendor: product.vendor?.name || "Unknown",
    })) ?? [];

  const columns: ColumnsType<(typeof products)[0]> = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div className="flex items-center space-x-2">
          <Avatar src={record.image} />
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Stock",
      dataIndex: "qty",
      key: "stock",
      render: (qty) => <Tag color={qty > 0 ? "green" : "red"}>{qty}</Tag>,
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
      render: (_, record) => (
        <button
          onClick={() => onModifyProduct(record)}
          className="text-blue-500 hover:underline flex items-center space-x-1"
        >
          <EditOutlined />
          <span>Modify</span>
        </button>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={products}
        columns={columns}
        pagination={false}
        loading={isLoading}
        bordered
        scroll={{ x: "max-content" }}
        className="custom-table"
      />

      {/* ✅ Custom Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          current={productsData?.meta?.current_page ?? 1}
          total={productsData?.meta?.total ?? 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default InventoryTable;
