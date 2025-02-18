import React, { useState } from "react";
import { Table, Tag, Pagination, Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useUsers, User } from "../../hooks/useUsers"; // ✅ Import `User` from `useUsers.ts`

interface UserTableProps {
  filters: Record<string, any>;
  onModifyUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ filters, onModifyUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: usersData, isLoading: usersLoading } = useUsers(
    currentPage,
    filters
  );

  // ✅ Explicitly define columns as `ColumnsType<User>`
  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (name, record) => (
        <div className="flex items-center space-x-2">
          <Avatar src={record.user_type?.icon || "/default-avatar.png"} />
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true, // ✅ Prevents text wrapping
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
    },
    {
      title: "WhatsApp",
      dataIndex: "whatsapp_phone",
      key: "whatsapp_phone",
      ellipsis: true,
      render: (whatsapp) => whatsapp || "N/A",
    },
    {
      title: "DOB",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      ellipsis: true,
      render: (dob) => dob || "N/A",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      ellipsis: true,
      render: (gender) => gender || "N/A",
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      key: "user_type",
      ellipsis: true,
      render: (user_type) => user_type?.name || "Unknown",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      ellipsis: true,
      render: (location) => location?.name || "Unknown",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      render: (address) => address || "N/A",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      ellipsis: true,
      render: (state) => state || "N/A",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      ellipsis: true,
      render: (country) => country || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 1 ? "green" : "red"}>
          {status === 1 ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <button
          onClick={() => onModifyUser(record)}
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
        dataSource={usersData?.data ?? []}
        columns={columns}
        pagination={false}
        loading={usersLoading}
        bordered
        scroll={{ x: "max-content" }}
        className="custom-table"
      />

      {/* ✅ Custom Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          current={usersData?.meta.current_page ?? 1}
          total={usersData?.meta.total ?? 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default UserTable;
