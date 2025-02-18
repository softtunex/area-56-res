import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface RolesPageHeaderProps {
  onCreateRole: () => void;
}

const RolesPageHeader: React.FC<RolesPageHeaderProps> = ({ onCreateRole }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold">Roles and Permissions</h1>
      <Button
        onClick={onCreateRole}
        className="bg-primary text-white"
        icon={<PlusOutlined />}
      >
        Create New Role
      </Button>
    </div>
  );
};

export default RolesPageHeader;
