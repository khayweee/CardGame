"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const GamePage = () => {
    const params = useParams();
    const sessionId = params?.sessionId; // Access sessionId safely
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        if (sessionId) {
            console.log("Session ID found:", sessionId);
            const ws = new WebSocket(`ws://localhost:8000/ws/${sessionId}?token=expected_token`); // Add token if required // Ensure this matches the backend route
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
    }, [sessionId]);

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