import React from "react";

interface ActivityDescription {
  time: string;
  text: string;
}

interface Activity {
  time: string;
  title: string;
  description: ActivityDescription[];
  color: string;
  icon: React.ReactNode;
}

interface ActivityLogProps {
  activities: Activity[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-6">Activity Log</h2>
      <div className="relative">
        {activities.map((activity, index) => (
          <div key={index} className="relative flex mb-10">
            {/* Vertical Line */}
            {index !== activities.length && (
              <div className="absolute left-5 top-10 h-full w-px bg-gray-300 z-0"></div>
            )}

            {/* Icon */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: activity.color }}
            >
              {activity.icon}
            </div>

            {/* Main Content */}
            <div>
              {/* Title */}
              <h3 className="font-semibold text-gray-700 mb-4 ml-6">
                {activity.title}
              </h3>

              {/* Descriptions */}
              <div className="space-y-4">
                {activity.description.map((desc, i) => (
                  <div key={i} className="relative flex items-start">
                    {/* Horizontal Line */}
                    <div className="absolute h-px w-12 ml-[-20px] bg-gray-300 top-8"></div>
                    {/* Time */}
                    <div className="text-sm text-gray-500 w-20 mt-5 ml-10">
                      {desc.time}
                    </div>
                    {/* Description */}
                    <div className="ml-4 text-sm text-gray-600 bg-gray-100 p-3 mt-2 rounded-lg">
                      {desc.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
