import React, { useState } from "react";
import { Button, Input } from "antd";

const SecuritySection: React.FC = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const toggleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      {!isChangingPassword ? (
        <Button
          onClick={toggleChangePassword}
          className="border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg text-gray-700"
        >
          Change Password
        </Button>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <Input.Password />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <Input.Password />
          </div>
          <div className="flex space-x-2">
            <Button onClick={toggleChangePassword} className="px-4 py-2">
              Cancel
            </Button>
            <Button type="primary" className="bg-primary px-4 py-2">
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySection;
