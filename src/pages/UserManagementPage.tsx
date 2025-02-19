import React, { useState } from "react";
import UserHeader from "../components/userManagement/UserHeader";
import UserTable from "../components/userManagement/UserTable";
import AddUserModal from "../components/userManagement/AddUserModal";

const UserManagementPage: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // ✅ Handle Opening Modal
  const handleAddUser = () => {
    setSelectedUser(null);
    setModalVisible(true); // ✅ Ensure state updates properly
  };

  // ✅ Handle Editing User
  const handleModifyUser = (user: any) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  // ✅ Handle Filters
  const handleApplyFilters = (filters: Record<string, any>) => {
    setFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <UserHeader
        onAddUser={handleAddUser} // ✅ Pass Function to Open Modal
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
      <UserTable onModifyUser={handleModifyUser} filters={filters} />

      {/* ✅ Add or Modify User Modal */}
      <AddUserModal
        visible={isModalVisible} // ✅ Ensure `visible` is properly passed
        onCancel={() => setModalVisible(false)}
        onSubmit={handleAddUser}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagementPage;
