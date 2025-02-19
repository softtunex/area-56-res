import React from "react";
import { Table, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { userData } from "../../data/userData";

interface UserTableProps {
  onModifyUser: (user: any) => void;
}

const UserTable: React.FC<UserTableProps> = ({ onModifyUser }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
        <div className="flex items-center space-x-2">
          <img
            src={record.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Departments and Teams",
      dataIndex: "team",
      key: "team",
    },
    {
      title: "Activity Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={status === "Online" ? "green" : "orange"}
          className="w-16 px-2 py-1 rounded-full flex items-center space-x-1"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              status === "Online" ? "bg-green-500" : "bg-orange-500"
            }`}
          ></span>
          <span>{status}</span>
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
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
    <Table
      dataSource={userData}
      columns={columns}
      pagination={{ pageSize: 10 }}
      bordered
      scroll={{ x: "100%" }}
    />
  );
};

export default UserTable;
