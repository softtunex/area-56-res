import React from "react";
import { Dropdown, Input, Avatar, Badge } from "antd";
import {
  BellOutlined,
  DownOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const Navbar: React.FC = () => {
  const branches = ["Lagos branch", "Abuja branch", "Port Harcourt branch"];

  // Dropdown menu for branches
  const branchMenu = (
    <div className="bg-white shadow-md rounded-lg border">
      {branches.map((branch, index) => (
        <div
          key={index}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => console.log(branch)}
        >
          {branch}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      {/* Left Section: Title */}
      <div className="flex items-center">
        <div className="text-lg font-bold">
          Area 56 <span className="text-xs text-gray-500">Admin</span>
        </div>
      </div>

      {/* Center Section: Branch Selector and Search Bar */}
      <div className="flex items-center space-x-6">
        {/* Branch Selector */}
        <Dropdown overlay={branchMenu} trigger={["click"]}>
          <div className="flex items-center text-blue-500 cursor-pointer">
            <EnvironmentOutlined className="mr-1 text-lg" />
            Lagos branch
            <DownOutlined className="ml-1" />
          </div>
        </Dropdown>

        {/* Search Bar */}
        <Input.Search
          placeholder="Search for Employee, Order ID"
          allowClear
          className="rounded-lg bg-gray-100"
          style={{ width: "300px" }}
        />
      </div>

      {/* Right Section: Notifications and User Profile */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <Badge count={3} offset={[10, 0]}>
          <BellOutlined className="text-xl cursor-pointer" />
        </Badge>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300"></div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <Avatar
            src="https://i.pravatar.cc/150?img=12"
            size="large"
            className="cursor-pointer"
          />
          <div>
            <div className="font-semibold">Daniel Benson</div>
            <div className="text-sm text-gray-500">Super-Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
