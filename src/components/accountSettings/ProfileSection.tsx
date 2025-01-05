import React, { useState } from "react";
import { Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const ProfileSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Basic Info</h2>
        <Button
          icon={<EditOutlined />}
          onClick={handleEditToggle}
          className="border border-gray-300 hover:border-gray-400 px-4 py-1.5 rounded-lg text-gray-700"
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <Input disabled={!isEditing} defaultValue="Ajayi" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <Input disabled={!isEditing} defaultValue="Olasola" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input disabled={!isEditing} defaultValue="danielbenson@gmail.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input disabled={!isEditing} defaultValue="08028371190" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Staff ID
          </label>
          <Input disabled defaultValue="SFS20353" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <Input disabled defaultValue="Waiter" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
