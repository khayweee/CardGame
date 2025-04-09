import { ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import customTheme from "./theme";

function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
