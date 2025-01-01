import React, { useState } from "react";
import RolesPageHeader from "../components/rolesAndPermissions/RolesPageHeader";
import RoleHeader from "../components/rolesAndPermissions/RoleHeader";
import PermissionGroup from "../components/rolesAndPermissions/PermissionGroup";
import CreateRoleModal from "../components/rolesAndPermissions/CreateRoleModal";
import { rolesData } from "../data/rolesData";

const RolesAndPermissionsPage: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [roles, setRoles] = useState(rolesData);

  const handleAddRole = (roleName: string) => {
    const newRole = {
      name: roleName,
      color: "blue", // Default color or you can customize
      permissionGroups: [],
    };
    setRoles((prevRoles) => [...prevRoles, newRole]);
    setModalVisible(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Page Header */}
      <RolesPageHeader
        onCreateRole={() => setModalVisible(true)} // Pass the modal handler
      />

      {/* Role Sections */}
      {roles.map((role, idx) => (
        <div
          key={idx}
          className="mb-8 border border-gray-300 rounded-lg shadow-sm"
        >
          {/* Role Header */}
          <RoleHeader roleName={role.name} color={role.color} />

          {/* Permission Groups */}
          {role.permissionGroups.map((group, idx) => (
            <PermissionGroup
              key={idx}
              title={group.title}
              description={group.description}
              permissions={group.permissions}
            />
          ))}
        </div>
      ))}

      {/* Create Role Modal */}
      <CreateRoleModal
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleAddRole}
      />
    </div>
  );
};

export default RolesAndPermissionsPage;
