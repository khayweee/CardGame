import { ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import customTheme from "./theme";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game/:sessionId/:playerId" element={<GamePage />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
