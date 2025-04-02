"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "../utils/auth";

const LandingPage = () => {
    const [name, setName] = useState("");
    const [sessionId, setSessionId] = useState("");
    const router = useRouter();

    const handleCreateGame = async () => {
        const createGameResponse = await fetch("https://localhost:8000/game/create-game", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        const data = await createGameResponse.json();
        const createPlayerResponse = await fetch("https://localhost:8000/game/add-player", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, session_id: data.session_id }),
        });
        const createPlayerData = await createPlayerResponse.json();
        console.log(createPlayerData);
        saveToken(createPlayerData.token); // Save the token to local storage
        // Pass the token to the next page
        router.push(`/game/${data.session_id}/${createPlayerData.player.id}`);
    };

    const handleJoinGame = async () => {
        const createPlayerResponse = await fetch("https://localhost:8000/game/add-player", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId, name: name }),
        });
        const createPlayerData = await createPlayerResponse.json();
        saveToken(createPlayerData.token); // Save the token to local storage
        console.log(createPlayerData);

        // Pass the token to the next page
        router.push(`/game/${sessionId}/${createPlayerData.player.id}`);
    };

    return (
        <div className="landing-page">
            <h1>Welcome to the Game</h1>
            <div>
                <label>Enter Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Enter Game ID:</label>
                <input
                    type="text"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                />
                <button onClick={handleJoinGame}>Join Game</button>
            </div>
            <div>
                <button onClick={handleCreateGame}>Create New Game</button>
            </div>
        </div>
    );
};

export default LandingPage;