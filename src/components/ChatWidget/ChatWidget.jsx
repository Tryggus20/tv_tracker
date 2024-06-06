import React, { useState } from "react";
import "./ChatWidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="chat-button" onClick={toggleChat}>
        Chat
      </button>
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h4>Chat</h4>
            <button className="close-button" onClick={toggleChat}>
              &times;
            </button>
          </div>
          <div className="chatbox-content">
            {/* chatbox */}
            <iframe
              src="https://tvtrackerbot-6854.chipp.ai"
              title="Tv Tracker Chatbox"
              className="chatbox-iframe"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
