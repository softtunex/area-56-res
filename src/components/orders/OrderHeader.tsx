import React from "react";
import { Button } from "antd";
import { Icon } from "@iconify/react";

interface OrderHeaderProps {
  title: string;
  onToggleFilters: () => void;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({
  title,
  onToggleFilters,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 space-y-4 lg:space-y-0">
        {/* Title Section */}
        <div className="flex items-center space-x-2">
          <Icon
            icon="mdi:clipboard-text-outline"
            className="text-xl text-primary"
          />
          <h1 className="text-lg lg:text-xl font-bold">{title}</h1>
        </div>

        {/* Filter Button */}
        <div className="flex space-x-3">
          <Button
            icon={<Icon icon="mdi:filter-outline" className="text-lg" />}
            onClick={onToggleFilters}
          >
            Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
