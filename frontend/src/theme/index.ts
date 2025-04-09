// src/theme.ts
import { theme as antdTheme, ThemeConfig } from "antd";

/**
 * Ant Design theme override using ThemeConfig interface
 */
const customTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1DA57A",
    colorBgLayout: "#f7f8fa",
    colorText: "#1F2A40",
    fontFamily: "Source Sans Pro, sans-serif",
    borderRadius: 8,
  },
  components: {
    Button: {
      colorPrimary: "#4cceac",
      borderRadius: 8,
    },
    Card: {
      headerBg: "#f5f5f5",
      actionsBg: "#1DA57A",
    },
    Modal: {
      titleColor: "#1DA57A",
    },
    Typography: {
      colorText: "#1DA57A",
      colorSuccess: "#1DA57A",
    },
    Input: {
      colorBgContainer: "#ffffff",
      borderRadius: 6,
    },
  },
};

/**
 * Custom extra color tokens (not part of Ant Design's default token system)
 */
export const extraTokens = {
  primary: {
    100: "#d0d1d5",
    200: "#a1a4ab",
    300: "#727681",
    400: "#1F2A40",
    500: "#141b2d",
    600: "#101624",
    700: "#0c101b",
    800: "#080b12",
    900: "#040509",
  },
  grey: {
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
  },
  greenAccent: {
    100: "#dbf5ee",
    200: "#b7ebde",
    300: "#94e2cd",
    400: "#70d8bd",
    500: "#4cceac",
    600: "#3da58a",
    700: "#2e7c67",
    800: "#1e5245",
    900: "#0f2922",
  },
  blueAccent: {
    100: "#e1e2fe",
    200: "#c3c6fd",
    300: "#a4a9fc",
    400: "#868dfb",
    500: "#6870fa",
    600: "#535ac8",
    700: "#3e4396",
    800: "#2a2d64",
    900: "#151632",
  },
  redAccent: {
    100: "#f8dcdb",
    200: "#f1b9b7",
    300: "#e99592",
    400: "#e2726e",
    500: "#db4f4a",
    600: "#af3f3b",
    700: "#832f2c",
    800: "#58201e",
    900: "#2c100f",
  },
};

/**
 * Hook to access merged AntD and custom tokens
 */
export const useCustomToken = () => {
  const { token } = antdTheme.useToken();
  return {
    ...token,
    ...extraTokens,
  };
};

// ✅ Export default theme config for ConfigProvider
export default customTheme;
