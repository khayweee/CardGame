import React from "react";
import { ConfigProvider } from "antd";
import theme from "@/theme"; // Import the theme configuration
import "./globals.css"; // Import global CSS if needed

export const metadata = {
  title: "Mr. Lim Card Game",
  description: "A fun card game application",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider theme={theme}>
      <html lang="en">
        <body>{children}</body> {/* Ensure children includes LandingPage */}
      </html>
    </ConfigProvider>
  );
};

export default RootLayout;
