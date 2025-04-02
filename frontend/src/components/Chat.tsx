import React, { useState } from "react";
import { List, Input, Button, Avatar } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { ChatMessage } from "@/models/ChatMessage";

const { TextArea } = Input;

interface ChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isConnected: boolean;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage, isConnected }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "1rem" }}>
      <List
        bordered
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item key={msg.playerId + msg.message}>
            <List.Item.Meta
              avatar={<Avatar>{msg.name.charAt(0).toUpperCase()}</Avatar>}
              title={msg.name}
              description={msg.message}
            />
          </List.Item>
        )}
        style={{ marginBottom: "1rem", height: 300, overflowY: "auto" }}
      />
      <TextArea
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={!isConnected}
        style={{ marginBottom: "0.5rem" }}
      />
      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={handleSendMessage}
        disabled={!isConnected || !message.trim()}
        block
      >
        Send
      </Button>
    </div>
  );
};

export default Chat;
