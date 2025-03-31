"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const GamePage = () => {
    const params = useParams();
    const sessionId = params?.sessionId; // Extract sessionId from the route
    const playerId = params?.playerId; // Extract playerId from the route
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        if (sessionId && playerId) {
            console.log("Session ID:", sessionId, "Player ID:", playerId);
            const token = "expected_token"; // Replace with the actual token logic if dynamic

            const ws = new WebSocket(`ws://localhost:8000/ws/${sessionId}/${playerId}?token=${token}`);
            console.log("WebSocket URL:", ws.url);
            ws.onopen = () => {
                console.log("WebSocket connection established.");
                setSocket(ws);
            };
            ws.onmessage = (event) => {
                console.log("Received message:", event.data);
                setMessages((prev) => [...prev, event.data]);
            };
            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
            ws.onclose = () => {
                console.log("WebSocket connection closed.");
                setSocket(null);
            };

            return () => {
                console.log("Cleaning up WebSocket connection.");
                ws.close();
            };
        }
    }, [sessionId, playerId]);

    const sendMessage = () => {
        if (socket && message.trim()) {
            socket.send(message);
            setMessage("");
        } else {
            console.log("Message is empty or socket is not connected.");
        }
    };

    return (
        <div className="game-page">
            <h1>Game Session: {sessionId}</h1>
            <h2>Player ID: {playerId}</h2>
            <div className="chat-box">
                <h2>Chat</h2>
                <div className="messages">
                    {messages.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))}
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}
                >
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" disabled={!socket || !message.trim()}>
                        Send
                    </button>
                </form>
            </div>
            <div className="game-interface">
                <h2>Game Interface</h2>
                {/* Add game-specific UI here */}
            </div>
        </div>
    );
};

export default GamePage;
