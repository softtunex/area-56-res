import React, { useState } from "react";
import { Table, Button, Spin, Pagination } from "antd";
import { useOrders } from "../../../hooks/useOrders";

const ActiveOrders: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ordersData, isLoading } = useOrders(currentPage, {
    order_status_id: 1,
  });

  const columns = [
    {
      title: "Order ID",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Customer",
      dataIndex: "user",
      key: "user",
      render: (user: { name: string; user_type: { icon: string } }) => (
        <div className="flex items-center space-x-2">
          <img src={user.user_type.icon} alt="icon" className="w-5 h-5" />
          <span>{user.name}</span>
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location: { name: string }) => location.name,
    },
    {
      title: "Status",
      dataIndex: "order_status",
      key: "order_status",
      render: (order_status: { name: string }) => (
        <span className="px-2 py-1 rounded-full bg-blue-500 text-white text-xs">
          {order_status.name}
        </span>
      ),
    },
    {
      title: "Total Items",
      dataIndex: "order_items",
      key: "order_items",
      render: (order_items: any[]) => order_items.length,
    },
    {
      title: "Total Amount",
      dataIndex: "order_items",
      key: "total_amount",
      render: (order_items: any[]) =>
        order_items
          .reduce((total, item) => total + parseFloat(item.amount), 0)
          .toFixed(2),
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
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={ordersData?.data ?? []}
            pagination={false}
            scroll={{ x: "100%" }}
          />

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

export default ActiveOrders;
