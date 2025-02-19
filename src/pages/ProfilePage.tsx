import React, { useState } from "react";
import { Tabs } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import ProfileDetails from "../components/accountSettings/ProfileDetails";
import ProfileSection from "../components/accountSettings/ProfileSection";
import SecuritySection from "../components/accountSettings/SecuritySection";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header Section with Back Button */}
      <div className="flex items-center mb-6">
        <button
          className="flex items-center text-gray-700 hover:text-primary"
          onClick={() => window.history.back()}
        >
          <LeftOutlined className="mr-2" />
          <span className="font-medium text-2xl">Account Settings</span>
        </button>
      </div>

      {/* Tabs for Profile and Security */}
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className="custom-tabs mb-6"
        tabBarStyle={{
          borderBottom: "none",
        }}
        items={[
          {
            key: "profile",
            label: (
              <span
                className={
                  activeTab === "profile"
                    ? "text-primary font-semibold"
                    : "text-gray-500"
                }
              >
                Profile
              </span>
            ),
            children: (
              <>
                <ProfileDetails />
                <ProfileSection />
              </>
            ),
          },
          {
            key: "security",
            label: (
              <span
                className={
                  activeTab === "security"
                    ? "text-primary font-semibold"
                    : "text-gray-500"
                }
              >
                Security
              </span>
            ),
            children: (
              <>
                <ProfileDetails />
                <SecuritySection />
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ProfilePage;
