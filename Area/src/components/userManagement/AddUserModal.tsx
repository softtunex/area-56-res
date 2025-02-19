import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Radio, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface AddNewUserModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  user?: {
    name: string;
    email: string;
    team: string;
    status: string;
  } | null; // User data for modification (null for new user)
}

const AddNewUserModal: React.FC<AddNewUserModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  user,
}) => {
  const [form] = Form.useForm();

  // Populate form fields when user data is provided
  useEffect(() => {
    if (user) {
      const [firstName = "", lastName = ""] = user.name.split(" ");
      form.setFieldsValue({
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        team: user.team,
        status: user.status,
      });
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((error) => console.error("Validation failed:", error));
  };

  return (
    <Modal
      title={user ? "Modify User" : "Add New User"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <div className="border-b border-gray-200 pb-4 mb-6"></div>
      <Form layout="vertical" form={form}>
        {/* Basic Info Section */}
        <h3 className="font-semibold text-red-500 underline mb-4">
          Basic Info
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
        </div>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <h3 className="font-semibold text-red-500 underline mb-4">Team</h3>
        <Form.Item
          name="team"
          label="Team"
          rules={[{ required: true, message: "Please select a team" }]}
        >
          <Select placeholder="Select team">
            <Select.Option value="Waiter Team">Waiter Team</Select.Option>
            <Select.Option value="Admin Team">Admin Team</Select.Option>
          </Select>
        </Form.Item>

        {/* Activity Status Section */}
        <div>
          <h3 className="font-semibold text-red-500 underline mb-4">
            Activity Status
          </h3>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Radio.Group>
              <Radio value="Active">Active</Radio>
              <Radio value="Inactive">Inactive</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="border-b border-gray-200 pb-4 mb-6"></div>
        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-6">
          {user && (
            <Button
              type="default"
              danger
              icon={<DeleteOutlined />}
              className="flex items-center"
            >
              Delete User
            </Button>
          )}
          <div className="space-x-4">
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AddNewUserModal;
