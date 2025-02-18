import React, { useState } from "react";

interface MessageSectionProps {
  message: string;
}

const MessageSection: React.FC<MessageSectionProps> = ({ message }) => {
  const [messages, setMessages] = useState([
    { sender: "Customer", time: "12:24 pm", content: message },
  ]);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleReplyToggle = () => {
    setIsReplying(!isReplying);
    setReplyMessage(""); // Clear the input field when toggling
  };

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      setMessages([
        ...messages,
        { sender: "You", time: "12:24 pm", content: replyMessage },
      ]);
      setReplyMessage(""); // Clear the input field
      setIsReplying(false); // Hide the reply field after sending the message
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Message from customer</h2>
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-gray-50 flex justify-between items-start"
          >
            <div>
              <div className="flex items-center mb-1">
                <span
                  className={`h-2 w-2 rounded-full ${
                    msg.sender === "Customer" ? "bg-red-500" : "bg-blue-500"
                  } mr-2`}
                ></span>
                <strong className="text-gray-800">{msg.sender}</strong>
                <span className="ml-2 text-sm text-gray-500">{msg.time}</span>
              </div>
              <p className="text-gray-700">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleReplyToggle}
        className="text-red-500 mt-4 focus:outline-none"
      >
        {isReplying ? "Cancel" : "Reply message"}
      </button>
      {isReplying && (
        <div className="flex items-center mt-4 border rounded-lg bg-gray-50">
          <input
            type="text"
            className="flex-1 p-3 border-none focus:ring-0 bg-transparent outline-none"
            placeholder="Type message here"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
          <button
            onClick={handleSendReply}
            className="px-4 py-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600 focus:outline-none disabled:bg-gray-300"
            disabled={!replyMessage.trim()}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageSection;
