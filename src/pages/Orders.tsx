import React, { useState } from "react";
import OrdersTable from "../components/orders/tables/OrdersTable";
import OrderFilters from "../components/orders/OrderFilters";
import OrderHeader from "../components/orders/OrderHeader";
import { useOrderStatuses } from "../hooks/useOrders";
import { Spin } from "antd";
import { Icon } from "@iconify/react";

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({}); // 🔥 Store active filters
  const [showFilters, setShowFilters] = useState(false); // 🔥 Toggle Filters
  const { data: orderStatuses, isLoading } = useOrderStatuses();

  // 🔥 Define icon mapping for statuses (Iconify)
  const statusIcons: Record<string, string> = {
    Placed: "mdi:cart-arrow-down",
    Confirm: "mdi:check-circle-outline",
    Preparing: "mdi:chef-hat",
    Completed: "mdi:clipboard-check-outline",
    Served: "mdi:food-variant",
  };

  // 🔥 Manually order the statuses from "Placed" → "Served"
  const orderedStatuses = [
    "Placed",
    "Confirm",
    "Preparing",
    "Completed",
    "Served",
  ];

  // ✅ Filter and sort statuses dynamically
  const sortedStatuses = orderStatuses
    ?.slice()
    .sort(
      (a, b) =>
        orderedStatuses.indexOf(a.name) - orderedStatuses.indexOf(b.name)
    );

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* ✅ Order Header Section */}
      <OrderHeader
        title="Orders Management"
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      {/* ✅ Filters Section (Collapsible) */}
      {showFilters && (
        <OrderFilters
          fields={[
            { key: "reference", label: "Order ID", type: "text" },
            { key: "user_id", label: "Customer ID", type: "number" },
            // { key: "location", label: "Location", type: "text" },
            { key: "dateRange", label: "Order Date", type: "date" },
          ]}
          onApplyFilters={(newFilters) =>
            setFilters({ ...filters, ...newFilters })
          }
          onClearFilters={() => setFilters({})}
        />
      )}
      {/* ✅ Tab Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div className="flex space-x-6">
          {isLoading ? (
            <Spin size="large" />
          ) : (
            sortedStatuses?.map((status) => (
              <button
                key={status.id}
                onClick={() => setActiveTab(status.id)}
                className={`flex flex-col items-center px-4 py-2 rounded-t-lg ${
                  activeTab === status.id
                    ? "text-primary border-b-4 border-primary font-semibold"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                <Icon
                  icon={statusIcons[status.name] || "mdi:cart"}
                  className="text-xl"
                />
                <span className="mt-1 text-sm">{status.name}</span>
              </button>
            ))
          )}
        </div>
      </div>
      {/* ✅ Tab Content */}
      <OrdersTable orderType={activeTab ?? 1} filters={filters} />{" "}
      {/* 🔥 Passing filters */}
    </div>
  );
};

export default Orders;
