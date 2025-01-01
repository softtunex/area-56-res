import React from "react";

interface MessageSectionProps {
  message: string;
}

const MessageSection: React.FC<MessageSectionProps> = ({ message }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Message from customer</h2>
      <div className="border rounded-lg p-4 bg-gray-100">
        <p className="text-gray-600">
          <strong>Customer:</strong> {message}
        </p>
      </div>
      <button className="text-red-500 mt-4">Reply message</button>
    </div>
  );
};

export default MessageSection;
