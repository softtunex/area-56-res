import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const InventoryHeader: React.FC<{ onAllProductsClick: () => void }> = ({
  onAllProductsClick,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="all">All Products</Menu.Item>
      <Menu.Item key="active">Active Products</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold">Inventory Management</h1>
      <div className="space-x-2">
        <Button icon={<FilterOutlined />}>Filters</Button>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button>All Products</Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default InventoryHeader;
