import React, { useState } from "react";
import { Collapse, Switch, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

interface Permission {
  name: string;
  description: string;
  enabled: boolean;
}

interface PermissionGroupProps {
  title: string;
  description?: string; // Added for group-level descriptions
  permissions: Permission[];
}

const PermissionGroup: React.FC<PermissionGroupProps> = ({
  title,
  description,
  permissions,
}) => {
  const [activeKey, setActiveKey] = useState<string | string[]>([]);

  return (
    <Collapse
      activeKey={activeKey}
      onChange={(key) => setActiveKey(key)}
      bordered={false}
    >
      <Collapse.Panel
        header={
          <div>
            <h3 className="font-semibold">{title}</h3>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        }
        key="1"
      >
        <div className="grid grid-cols-2 gap-4">
          {permissions.map((perm, idx) => (
            <div key={idx} className="flex justify-between items-center ml-6">
              <div className="flex items-center space-x-2">
                <span>{perm.name}</span>
                <Tooltip title={perm.description}>
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
              <Switch defaultChecked={perm.enabled} />
            </div>
          ))}
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default PermissionGroup;
