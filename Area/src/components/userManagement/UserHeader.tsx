import React from "react";
import { Dropdown, Menu, Button } from "antd";
import {
  DownOutlined,
  UserOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";

interface UserHeaderProps {
  onAddUser: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ onAddUser }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">Staffs members</Menu.Item>
      <Menu.Item key="2">Customer</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 space-y-4 lg:space-y-0">
      {/* Left Section */}
      <div className="flex items-center flex-wrap space-x-2">
        <UserOutlined className="text-xl text-red-500" />
        <h1 className="text-lg lg:text-xl font-bold">User Management</h1>
        <Dropdown overlay={menu}>
          <Button className="mt-2 lg:mt-0">
            Staffs members <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap space-x-2 space-y-2 lg:space-y-0 justify-start lg:justify-end">
        <Button
          type="default"
          onClick={onAddUser}
          icon={<PlusOutlined />}
          className="border border-red-500 text-red-500 flex items-center"
        >
          Add New User
        </Button>
        <Button icon={<FilterOutlined />} className="flex items-center">
          Filters
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
