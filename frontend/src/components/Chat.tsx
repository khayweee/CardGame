import React, { useState } from "react";
import { List, Input, Button, Typography } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { ChatMessage } from "../models/ChatMessage";
import ChatMessageContainer from "./ChatMessageContainer";

const { TextArea } = Input;

interface ChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isConnected: boolean;
  playerId: string;
}

const Chat: React.FC<ChatProps> = ({
  messages,
  onSendMessage,
  isConnected,
  playerId,
}) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: 500,
        border: "1px solid #f0f0f0",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <List
          dataSource={messages}
          renderItem={(message) => {
            const isCurrentUser = message.playerId === playerId;
            return (
              <List.Item
                style={{
                  justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                  padding: "8px 0",
                  borderBottom: "none",
                }}
              >
                <ChatMessageContainer
                  name={message.name}
                  message={message.message}
                  isCurrentPlayer={isCurrentUser}
                />
              </List.Item>
            );
          }}
        />
      </div>
      <div
        style={{
          padding: 12,
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          gap: 8,
        }}
      >
        <TextArea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type a message..."
          disabled={!isConnected}
          autoSize={{ minRows: 1, maxRows: 3 }}
        />
        <Button
          icon={<SendOutlined />}
          type="primary"
          disabled={!isConnected}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
