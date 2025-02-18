import React, { useState, useEffect } from "react";
import { Collapse, Switch, Tooltip, Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  usePermissions,
  useToggleRolePermission,
} from "../../hooks/usePermissions";

interface PermissionGroupProps {
  roleId: number;
}

const PermissionGroup: React.FC<PermissionGroupProps> = ({ roleId }) => {
  const { data: permissions, isLoading, error } = usePermissions();
  const { mutate: togglePermission, isPending } = useToggleRolePermission();
  const [assignedPermissions, setAssignedPermissions] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    // Initialize permissions as unchecked
    if (permissions) {
      const initialPermissions: Record<number, boolean> = {};
      permissions.forEach((permission) => {
        initialPermissions[permission.id] = permission.status || false; // Use default status
      });
      setAssignedPermissions(initialPermissions);
    }
  }, [permissions]);

  if (isLoading) return <Spin className="flex justify-center my-6" />;
  if (error)
    return (
      <p className="text-primary text-center">Failed to load permissions</p>
    );

  // ✅ Handle Permission Toggle
  const handleToggle = (permissionId: number) => {
    const currentStatus = assignedPermissions[permissionId] || false;
    const updatedStatus = !currentStatus;

    setAssignedPermissions((prev) => ({
      ...prev,
      [permissionId]: updatedStatus,
    }));

    togglePermission({
      role_id: roleId,
      permission_id: permissionId,
      status: updatedStatus,
    });
  };

  return (
    <Collapse bordered={false} defaultActiveKey={["1"]}>
      <Collapse.Panel
        header={<h3 className="font-semibold">Permissions</h3>}
        key="1"
      >
        <div className="grid grid-cols-2 gap-4">
          {permissions?.map((permission) => (
            <div
              key={permission.id}
              className="flex justify-between items-center ml-6"
            >
              <div className="flex items-center space-x-2">
                <span>{permission.name}</span>
                <Tooltip title={permission.description}>
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
              <Switch
                checked={assignedPermissions[permission.id] ?? false}
                loading={isPending}
                onChange={() => handleToggle(permission.id)}
              />
            </div>
          ))}
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default PermissionGroup;
