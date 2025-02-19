import React, { useState } from "react";
import RolesPageHeader from "../components/rolesAndPermissions/RolesPageHeader";
import RoleHeader from "../components/rolesAndPermissions/RoleHeader";
import PermissionGroup from "../components/rolesAndPermissions/PermissionGroup";
import CreateRoleModal from "../components/rolesAndPermissions/CreateRoleModal";
import { useRoles } from "../hooks/useRoles";

const RolesAndPermissionsPage: React.FC = () => {
  const { data: roles } = useRoles();
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<{
    id: number;
    name: string;
    description: string;
  } | null>(null);

  const handleEditRole = (role: {
    id: number;
    name: string;
    description: string;
  }) => {
    setEditingRole(role);
    setModalVisible(true);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Page Header */}
      <RolesPageHeader onCreateRole={() => setModalVisible(true)} />

      {/* Role Sections */}
      {roles?.map((role) => (
        <div
          key={role.id}
          className="mb-8 border border-gray-300 rounded-lg shadow-sm"
        >
          {/* Role Header with Edit & Delete */}
          <RoleHeader
            roleId={role.id}
            roleName={role.name}
            description={role.description}
            color="blue"
            onEdit={() => handleEditRole(role)}
          />

          {/* ✅ Pass `roleId` to PermissionGroup */}
          <PermissionGroup roleId={role.id} />
        </div>
      ))}

      {/* Create & Edit Role Modal */}
      <CreateRoleModal
        visible={isModalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingRole(null);
        }}
        roleToEdit={editingRole}
      />
    </div>
  );
};

export default RolesAndPermissionsPage;
