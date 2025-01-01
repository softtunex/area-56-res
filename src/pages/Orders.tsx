import React, { useState } from "react";
import ActiveOrders from "../components/orders/tables/ActiveOrders";
import OrderDetails from "../components/orders/tables/OrderDetails";
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HourglassOutlined,
  ExclamationCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Button } from "antd";

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Active Orders");

  const tabs = [
    {
      label: "Active Orders (7)",
      key: "Active Orders",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Served (20)",
      key: "Served",
      icon: <CheckCircleOutlined />,
    },
    {
      label: "Canceled (5)",
      key: "Canceled",
      icon: <CloseCircleOutlined />,
    },
    {
      label: "Completed (20)",
      key: "Completed",
      icon: <HourglassOutlined />,
    },
    {
      label: "Unconfirmed Payment (4)",
      key: "Unconfirmed Payment",
      icon: <ExclamationCircleOutlined />,
    },
  ];

  // Filter dropdown menu
  const filterMenu = (
    <Menu>
      <Menu.Item key="1">Last 24 hours</Menu.Item>
      <Menu.Item key="2">Last 7 days</Menu.Item>
      <Menu.Item key="3">Last 30 days</Menu.Item>
    </Menu>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Active Orders":
        return <ActiveOrders />;
      case "Served":
        return <OrderDetails orderType="Served" />;
      case "Canceled":
        return <OrderDetails orderType="Canceled" />;
      case "Completed":
        return <OrderDetails orderType="Completed" />;
      case "Unconfirmed Payment":
        return <OrderDetails orderType="Unconfirmed Payment" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Tab Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        {/* Tabs */}
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-col items-center px-4 py-2 rounded-t-lg ${
                activeTab === tab.key
                  ? "text-red-500 border-b-4 border-red-500 font-semibold"
                  : "text-gray-500 hover:text-red-500"
              }`}
            >
              <div className="text-lg">{tab.icon}</div>
              <span className="mt-1 text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Filter Button */}
        <Dropdown overlay={filterMenu} trigger={["click"]}>
          <Button icon={<FilterOutlined />} className="text-gray-500">
            Filters
          </Button>
        </Dropdown>
      </div>

      {/* Tab Content */}
      <div>{renderContent()}</div>
    </div>
  );
};

export default Orders;
