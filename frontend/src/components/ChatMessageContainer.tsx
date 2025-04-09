import React from "react";
import { Typography, Avatar } from "antd";
import { useCustomToken } from "../theme";

const { Text } = Typography;

interface ChatMessageContainerProps {
  name: string;
  message: string;
  isCurrentPlayer: boolean;
}

const ChatMessageContainer: React.FC<ChatMessageContainerProps> = ({
  name,
  message,
  isCurrentPlayer,
}) => {
  const token = useCustomToken();

  const backgroundColor = isCurrentPlayer
    ? token.greenAccent[200]
    : token.greenAccent[700];

  const textColor = isCurrentPlayer
    ? token.greenAccent[700]
    : token.greenAccent[200];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isCurrentPlayer ? "row-reverse" : "row",
        alignItems: "center",
        maxWidth: "60%",
      }}
    >
      <Avatar
        style={{
          margin: isCurrentPlayer ? "0 0 0 8px" : "0 8px 0 0",
          flexShrink: 0,
        }}
      >
        {name.charAt(0).toUpperCase()}
      </Avatar>
      <div
        style={{
          background: backgroundColor,
          padding: "8px 12px",
          borderRadius: 16,
          display: "inline-block",
        }}
      >
        <Text style={{ whiteSpace: "pre-wrap", color: textColor }}>
          {message}
        </Text>
      </div>
    </div>
  );
};

export default ChatMessageContainer;
