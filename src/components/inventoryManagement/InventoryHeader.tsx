import React from "react";
import { Button } from "antd";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";

interface InventoryHeaderProps {
  onAddProductClick: () => void;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  onAddProductClick,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold">Inventory Management</h1>
      <div className="space-x-2">
        <Button icon={<FilterOutlined />}>Filters</Button>
        <Button icon={<PlusOutlined />} onClick={onAddProductClick}>
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default InventoryHeader;
