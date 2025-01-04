import React from "react";

interface RoleHeaderProps {
  roleName: string;
  color: string;
}

const RoleHeader: React.FC<RoleHeaderProps> = ({ roleName, color }) => {
  return (
    <>
      <div className={`flex items-center space-x-2 p-4 bg-gray-100`}>
        <span className={`w-2 h-2 rounded-full bg-${color}-500`} />
        <h2 className="font-semibold">{roleName}</h2>
      </div>
      <div className="border-b border-black-200">
        <h2 className="font-semibold ml-8">Permissions</h2>
      </div>
    </>
  );
};

export default RoleHeader;
