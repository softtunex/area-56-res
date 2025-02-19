import React, { useState } from "react";
import { Input, Select, DatePicker, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

interface FilterField {
  key: string;
  label: string;
  type: "text" | "select" | "date" | "status" | "number";
  options?: { value: string | number; label: string }[];
}

interface OrderFiltersProps {
  fields: FilterField[];
  onApplyFilters: (filters: Record<string, any>) => void;
  onClearFilters: () => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  fields,
  onApplyFilters,
  onClearFilters,
}) => {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {fields.map(({ key, label, type, options }) => (
          <div key={key}>
            {type === "text" && (
              <Input
                placeholder={label}
                onChange={(e) => handleFilterChange(key, e.target.value)}
              />
            )}
            {type === "number" && (
              <Input
                type="number"
                placeholder={label}
                onChange={(e) => handleFilterChange(key, e.target.value)}
              />
            )}
            {type === "select" && (
              <Select
                placeholder={label}
                onChange={(value) => handleFilterChange(key, value)}
                className="w-full"
                options={options}
              />
            )}
            {type === "date" && (
              <RangePicker
                className="w-full"
                onChange={(dates) =>
                  handleFilterChange(
                    key,
                    dates?.map((d) => d?.format("YYYY-MM-DD")) ?? []
                  )
                }
              />
            )}
            {type === "status" && (
              <Select
                placeholder="Status"
                className="w-full"
                onChange={(value) => handleFilterChange(key, value)}
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="primary"
          icon={<FilterOutlined />}
          onClick={() => onApplyFilters(filters)}
        >
          Apply Filters
        </Button>
        <Button onClick={onClearFilters}>Clear Filters</Button>
      </div>
    </div>
  );
};

export default OrderFilters;
