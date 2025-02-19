import React from "react";
import { Dropdown, Menu, Modal } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteRole } from "../../hooks/useRoles"; // ✅ Import delete hook

interface RoleHeaderProps {
  roleId: number;
  roleName: string;
  description: string;
  color: string;
  onEdit: () => void; // ✅ Callback for edit
}

const RoleHeader: React.FC<RoleHeaderProps> = ({
  roleId,
  roleName,
  color,
  onEdit,
}) => {
  const { mutate: deleteRole } = useDeleteRole();

  // ✅ Handle Delete Confirmation
  const confirmDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this role?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteRole(roleId);
      },
    });
  };

  // ✅ Menu for Edit & Delete
  const menu = (
    <Menu>
      <Menu.Item key="edit" icon={<EditOutlined />} onClick={onEdit}>
        Edit Role
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        onClick={confirmDelete}
        danger
      >
        Delete Role
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className={`flex items-center justify-between p-4 bg-gray-100`}>
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full bg-${color}-500`} />
          <h2 className="font-semibold">{roleName}</h2>
        </div>

        {/* 🔹 Three Dots Menu */}
        <Dropdown overlay={menu} trigger={["click"]}>
          <MoreOutlined className="text-xl cursor-pointer" />
        </Dropdown>
      </div>

      <div className="border-b border-gray-200" />
    </>
  );
};

export default RoleHeader;
