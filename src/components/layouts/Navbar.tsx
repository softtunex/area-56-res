import React, { useMemo } from "react";
import { Dropdown, Input, Avatar, Badge, Spin } from "antd";
import {
  BellOutlined,
  DownOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "../../hooks/useAuth";
import {
  useLocations,
  useUserLocation,
  useUpdateLocation,
} from "../../hooks/useLocation";
import Logo from "../../asset/images/Area-56-logo.png";

// ✅ User Role Mapping
const USER_ROLES: Record<number, string> = {
  1: "Super Admin",
  2: "Staff",
  3: "Guest",
  4: "Customer",
  5: "Company",
};

const Navbar: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { data: user } = useAuth();
  const { mutate: logout } = useLogout();
  const { data: locations } = useLocations();
  const { data: userLocation, isLoading: locationLoading } = useUserLocation(
    user?.location?.id
  );

  const { mutate: updateLocation, isPending } = useUpdateLocation();

  // ✅ Ensure `user_type_id` is a number
  const userTypeId = useMemo(
    () => Number(user?.user_type_id) || 3,
    [user?.user_type_id]
  );

  // ✅ Handle Super Admin Location Selection
  const handleLocationChange = (locationId: number) => {
    updateLocation(locationId);
  };

  // ✅ Profile Dropdown (Logout)
  const profileMenu = (
    <div className="bg-white shadow-md rounded-lg border w-48">
      <div
        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        onClick={() => navigate("/profile")}
      >
        Profile
      </div>
      <div
        className="px-4 py-2 text-primary cursor-pointer hover:bg-gray-100"
        onClick={() => logout()}
      >
        Log Out
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-primary shadow-sm">
      {/* 🔹 Left Section - Logo & Sidebar Toggle */}
      <div className="flex items-center space-x-4">
        {/* 📌 Sidebar Toggle Button (Always Visible) */}

        {/* 📌 Logo */}
        <div className="text-lg font-bold flex items-center space-x-2">
          <img src={Logo} alt="AREA 56 Logo" className="w-7 bg-primary" />
          <span className="text-xs text-white">Admin</span>
        </div>
      </div>

      {/* 🔹 Middle Section - Location & Search (Hidden on Small Screens) */}
      <div className="hidden md:flex items-center space-x-6">
        {userTypeId === 1 ? (
          <Dropdown
            overlay={
              <div className="bg-white shadow-md rounded-lg border">
                {locations?.map((location) => (
                  <div
                    key={location.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationChange(location.id)}
                  >
                    {isPending ? <Spin size="small" /> : location.name}
                  </div>
                ))}
              </div>
            }
            trigger={["click"]}
          >
            <div className="flex items-center text-secondary cursor-pointer">
              <EnvironmentOutlined className="mr-1 text-lg" />
              {userLocation || "Select Location"}
              <DownOutlined className="ml-1" />
            </div>
          </Dropdown>
        ) : (
          <div className="flex items-center text-gray-700">
            <EnvironmentOutlined className="mr-1 text-lg" />
            {locationLoading ? (
              <Spin size="small" />
            ) : (
              userLocation || "Unknown Location"
            )}
          </div>
        )}

        {/* 🔎 Search Bar (Hidden on Small Screens) */}
        <Input.Search
          placeholder="Search for Employee, Order ID"
          allowClear
          className="rounded-lg bg-gray-100 hidden md:block"
          style={{ width: "300px" }}
        />
      </div>

      {/* 🔔 Right Section - Notifications & Profile */}
      <div className="flex items-center space-x-6 text-gray-100">
        {/* 🔔 Notifications Icon */}
        <Badge count={3} offset={[10, 0]}>
          <BellOutlined
            className="text-xl cursor-pointer text-gray-100"
            onClick={() => navigate("/notifications")}
          />
        </Badge>

        <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

        {/* 🔹 User Profile Dropdown */}
        <Dropdown overlay={profileMenu} trigger={["click"]}>
          <div className="flex items-center space-x-3 cursor-pointer ">
            <Avatar
              src={user?.user_type?.icon ?? "https://via.placeholder.com/150"} // ✅ Fix `avatar` issue
              size="large"
              className="cursor-pointer bg-gray-100"
            />
            <div className="hidden md:block">
              <div className="font-semibold">
                {user?.name || "Unknown User"}
              </div>
              <div className="text-sm text-gray-500">
                {USER_ROLES[userTypeId]} {/* ✅ Fixed Default Role Display */}
              </div>
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
