import React, { useState, useEffect } from "react";
import { Modal, Input, Button } from "antd";
import { useCreateRole, useUpdateRole } from "../../hooks/useRoles";

interface CreateRoleModalProps {
  visible: boolean;
  onCancel: () => void;
  roleToEdit?: { id: number; name: string; description: string } | null;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({
  visible,
  onCancel,
  roleToEdit,
}) => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  const isEditMode = !!roleToEdit; // ✅ Check if modal is in edit mode

  useEffect(() => {
    if (roleToEdit) {
      setRoleName(roleToEdit.name);
      setDescription(roleToEdit.description);
    } else {
      setRoleName("");
      setDescription("");
    }
  }, [roleToEdit]);

  const { mutate: createRole, isPending: creating } = useCreateRole();
  const { mutate: updateRole, isPending: updating } = useUpdateRole();

  const handleSubmit = () => {
    if (roleName.trim()) {
      if (isEditMode) {
        updateRole({
          roleId: roleToEdit!.id,
          updatedRole: { name: roleName, description },
        });
      } else {
        createRole({ name: roleName, description });
      }
      onCancel();
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      title={
        <h2 className="text-lg font-bold">
          {isEditMode ? "Edit Role" : "Create Role"}
        </h2>
      }
      centered
    >
      <div>
        <label className="block text-sm font-semibold mb-2">Role Name</label>
        <Input
          placeholder="Enter role name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="border-gray-300"
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-semibold mb-2">Description</label>
        <Input.TextArea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-gray-300"
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={onCancel} className="mr-2">
          Cancel
        </Button>
        <Button
          className="bg-primary text-white"
          onClick={handleSubmit}
          loading={creating || updating}
        >
          {isEditMode ? "Update Role" : "Create Role"}
        </Button>
      </div>
    </Modal>
  );
};

export default CreateRoleModal;
