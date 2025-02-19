import React from "react";
import { Link, useLocation } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
  const location = useLocation();
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Unauthorized Access
      </h1>
      <p className="text-gray-700 mb-4">
        You do not have permission to view this page.
      </p>
      <p className="text-gray-500 text-sm">
        Requested Path: {location.state?.from?.pathname || "Unknown"}
      </p>
      <Link
        to="/dashboard"
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
