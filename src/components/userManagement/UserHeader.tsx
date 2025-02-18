import React, { useState } from "react";
import { Button } from "antd";
import { UserOutlined, PlusOutlined, FilterOutlined } from "@ant-design/icons";
import UserFilters from "./UserFilters";

interface UserHeaderProps {
  onAddUser: () => void;
  onApplyFilters: (filters: Record<string, any>) => void;
  onClearFilters: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  onAddUser,
  onApplyFilters,
  onClearFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // const menu = (
  //   <Menu>
  //     <Menu.Item key="1">Staff members</Menu.Item>
  //     <Menu.Item key="2">Customers</Menu.Item>
  //   </Menu>
  // );

  return (
    <div className="mb-6">
      {/* ✅ Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-2">
          <UserOutlined className="text-xl text-primary" />
          <h1 className="text-lg lg:text-xl font-bold">User Management</h1>
          {/* <Dropdown overlay={menu}>
            <Button>
              Staff members <DownOutlined />
            </Button>
          </Dropdown> */}
        </div>

        <div className="flex space-x-3">
          <Button
            type="default"
            onClick={onAddUser}
            icon={<PlusOutlined />}
            className="border border-primary text-primary"
          >
            Add New User
          </Button>
          <Button
            icon={<FilterOutlined />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </div>
      </div>

      {/* ✅ Filters Section */}
      {showFilters && (
        <UserFilters
          fields={[
            { key: "name", label: "Name", type: "text" },
            { key: "email", label: "Email", type: "text" },
            { key: "phone", label: "Phone", type: "text" },
            { key: "whatsapp", label: "WhatsApp", type: "text" },
            {
              key: "gender",
              label: "Gender",
              type: "select",
              options: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ],
            },
            {
              key: "userType",
              label: "User Type",
              type: "select",
              options: [
                { value: "admin", label: "Admin" },
                { value: "staff", label: "Staff" },
                { value: "customer", label: "Customer" },
              ],
            },
            { key: "location", label: "Location", type: "text" },
            { key: "address", label: "Address", type: "text" },
            { key: "state", label: "State", type: "text" },
            { key: "status", label: "Status", type: "status" },
          ]}
          onApplyFilters={onApplyFilters}
          onClearFilters={onClearFilters}
        />
      )}
    </div>
  );
};

export default UserHeader;
