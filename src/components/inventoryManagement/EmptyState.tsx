import { CoffeeOutlined } from "@ant-design/icons";
import React from "react";

const EmptyState: React.FC<{ onUpdateListClick: () => void }> = ({
  onUpdateListClick,
}) => (
  <div className="flex flex-col items-center justify-center h-[70vh]">
    {/* <img
      src="/empty-state-icon.png" // Placeholder for the empty state icon
      alt="No Products"
      className="mb-4"
    /> */}
    <div className="text-6xl text-gray-300 mb-4">
      <CoffeeOutlined />
    </div>
    <p className="text-lg font-medium mb-2">No Active Products</p>
    <button
      onClick={onUpdateListClick}
      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
    >
      <span className="mr-2">+</span> Update List
    </button>
  </div>
);

export default EmptyState;
