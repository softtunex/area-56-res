import React from "react";
import { Avatar } from "antd";

const ProfileDetails: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg mb-6 border border-gray-200">
      <div className="flex items-center">
        <Avatar
          src="https://i.pravatar.cc/150?img=12"
          size={64}
          className="mr-4"
        />
        <div>
          <div className="font-semibold text-lg">Ajayi Olasola</div>
          <div className="text-sm text-gray-500">Waiter</div>
          <div className="text-sm text-gray-500">Lagos Branch</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
