const server = import.meta.env.VITE_REACT_APP_BACKEND_API || "http://localhost:8000";
console.log(`Backend API URL: ${server}`);

// Function to create a new game session
export const createGameAPI = async () => {
  const response = await fetch(`${server}/game/create-game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to create game");
  }
  return response.json();
};

// Function to add a player to a game session
export const addPlayerAPI = async (name: string, sessionId: string) => {
  const response = await fetch(`${server}/game/add-player`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, session_id: sessionId }),
  });
  if (!response.ok) {
    throw new Error("Failed to add player");
  }
  return response.json();
};
