import React, { useState } from "react";
import { Table, Spin, Pagination } from "antd";
import { useOrders } from "../../../hooks/useOrders";
// import { Icon } from "@iconify/react";

interface OrdersTableProps {
  orderType: number;
  filters: Record<string, any>; // 🔥 Accepting filters as a prop
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orderType, filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ordersData, isLoading } = useOrders(currentPage, {
    order_status_id: orderType,
    ...filters, // 🔥 Merge filters dynamically
  });

  const columns = [
    { title: "Order ID", dataIndex: "reference", key: "reference" },
    {
      title: "Customer",
      dataIndex: "user",
      key: "user",
      render: (user: { name: string; user_type?: { icon?: string } }) => (
        <div className="flex items-center space-x-2">
          <img
            src={user?.user_type?.icon || "/default-avatar.png"}
            alt="icon"
            className="w-5 h-5 rounded-full"
          />
          <span>{user?.name || "N/A"}</span>
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location: { name: string }) => location?.name || "N/A",
    },
    {
      title: "Status",
      dataIndex: "order_status",
      key: "order_status",
      render: (order_status: { name: string }) => (
        <span className="px-2 py-1 rounded-full bg-blue-500 text-white text-xs">
          {order_status?.name || "N/A"}
        </span>
      ),
    },
    {
      title: "Total Items",
      dataIndex: "order_items",
      key: "order_items",
      render: (order_items: any[]) => order_items?.length ?? 0,
    },
    {
      title: "Total Amount",
      dataIndex: "order_items",
      key: "total_amount",
      render: (order_items: any[]) =>
        order_items
          ?.reduce((total, item) => total + parseFloat(item.amount), 0)
          .toFixed(2) || "0.00",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) =>
        new Date(date).toLocaleDateString("en-US") || "N/A",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: { id: number }) => (
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
      {/* 🔥 Show loading spinner */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {/* 🔥 Render Table */}
          <Table
            className="custom-table"
            columns={columns}
            dataSource={ordersData?.data ?? []}
            pagination={false}
          />
          {/* 🔥 Pagination */}
          <div className="flex justify-end mt-4">
            <Pagination
              current={ordersData?.meta.current_page ?? 1}
              total={ordersData?.meta.total ?? 0}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersTable;
