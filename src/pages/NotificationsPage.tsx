import React, { useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { FilterOutlined, DownOutlined } from "@ant-design/icons";
import { notifications } from "../data/notificationsData";

const NotificationsPage: React.FC = () => {
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);

  const filterMenu = (
    <Menu
      onClick={(e) => setFilteredCategory(e.key)}
      items={[
        { key: "All", label: "All Notifications" },
        { key: "Orders", label: "Orders" },
        { key: "Inventory", label: "Inventory" },
        { key: "Customer Orders", label: "Customer Orders" },
      ]}
    />
  );

  const filteredNotifications = filteredCategory
    ? filteredCategory === "All"
      ? notifications
      : notifications.filter((n) => n.category === filteredCategory)
    : notifications;

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Dropdown overlay={filterMenu} trigger={["click"]}>
          <Button className="flex items-center" icon={<FilterOutlined />}>
            Filters <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div>
              <div className="text-sm text-gray-500">{notification.time}</div>
              <div className="text-gray-700">{notification.message}</div>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={notification.buttonAction}
            >
              {notification.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
