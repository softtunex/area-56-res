import React from "react";
import { Modal, Input, Button } from "antd";

interface CreateRoleModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (roleName: string) => void;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [roleName, setRoleName] = React.useState("");

  const handleAddRole = () => {
    if (roleName.trim()) {
      onSubmit(roleName);
      setRoleName(""); // Reset the input
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      title={<h2 className="text-lg font-bold">Confirm order completion</h2>}
      centered
      className="custom-modal"
    >
      <div>
        <label htmlFor="roleName" className="block text-sm font-semibold mb-2">
          Role Name
        </label>
        <Input
          id="roleName"
          placeholder="Enter role name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="border-gray-300"
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          type="primary"
          onClick={handleAddRole}
          className="bg-red-500 text-white px-6 py-2 rounded"
        >
          Add Role
        </Button>
      </div>
    </Modal>
  );
};

export default CreateRoleModal;
