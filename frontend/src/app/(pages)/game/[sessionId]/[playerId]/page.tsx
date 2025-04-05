"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Chat from "@/app/components/Chat";
import { ChatMessage } from "@/models/ChatMessage";
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/app/utils/auth";
import { Row, Col } from "antd";

interface DecodedToken {
  player_id: string;
  name: string;
  exp: number;
  iat: number;
}

const GamePage = () => {
  const params = useParams();
  const sessionId = params?.sessionId;
  const playerId = (params?.playerId as string) || "";
  const token = getToken();
  const [playerName, setPlayerName] = useState("Unknown Player"); // Initialize playerName state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token); // Decode the token
        setPlayerName(decoded.name); // Extract and set the player's name
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (sessionId && playerId && token) {
      const ws = new WebSocket(
        `wss://localhost:8000/ws/${sessionId}/${playerId}?token=${token}`
      );
      ws.onopen = () => setSocket(ws);
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      };
      ws.onerror = (error) => console.error("WebSocket error:", error);
      ws.onclose = () => setSocket(null);

      return () => ws.close();
    }
  }, [sessionId, playerId, token]);

  const sendMessage = (message: string) => {
    if (socket && message.trim()) {
      const chatMessage: ChatMessage = {
        playerId,
        name: playerName,
        message,
      };
      socket.send(JSON.stringify(chatMessage));
    }
  };

  return (
    <div className="game-page">
      <Row>
        <Col span={16}>
          <h1>Game Session: {sessionId}</h1>
          <h2>Player ID: {playerId}</h2>
          <h3>Player Name: {playerName}</h3>
          <div className="game-interface">
            <h2>Game Interface</h2>
            {/* Add game-specific UI here */}
          </div>
        </Col>
        <Col span={8}>
          <Chat
            messages={messages}
            onSendMessage={sendMessage}
            isConnected={!!socket}
            playerId={playerId}
          />
        </Col>
      </Row>
    </div>
  );
};

export default GamePage;
