import React, { useState } from "react";
import UserHeader from "../components/userManagement/UserHeader";
import UserTable from "../components/userManagement/UserTable";
import AddUserModal from "../components/userManagement/AddUserModal";

const UserManagementPage: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = (values: any) => {
    console.log("User Data:", values);
    setModalVisible(false);
    // Logic to handle adding or modifying user data
  };

  const handleModifyUser = (user: any) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <UserHeader
        onAddUser={() => {
          setSelectedUser(null);
          setModalVisible(true);
        }}
      />
      <UserTable onModifyUser={handleModifyUser} />

      {/* Add or Modify User Modal */}
      <AddUserModal
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleAddUser}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagementPage;
