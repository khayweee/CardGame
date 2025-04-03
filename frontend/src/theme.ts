import { Modal } from "antd";

const theme = {
  token: {
    colorPrimary: "#1DA57A", // Replace with your desired primary color
    // Add other global theme tokens here as needed
  },
  components: {
    Card: {
      headerBg: "#f5f5f5", // Background color for the Card header
      actionsBg: "#1DA57A", // Color for the extra content
      // Add other Card-specific tokens here as needed
    },
    Modal: {
      titleColor: "#1DA57A", // Text color for the modal
    },
    Typography: {
      colorText: "#1DA57A", // Default text color
      colorSuccess: "#1DA57A", // Default text color
      colorTextSecondary: "#666666", // Secondary text color
    },
  },
};

export default theme;
