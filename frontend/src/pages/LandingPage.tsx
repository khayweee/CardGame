import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";
import { Button, Input, Form, Typography, Card, Space, Modal } from "antd";
import { useCustomToken } from "../theme";
import { createGameAPI, addPlayerAPI } from "../utils/backend_service";

const { Title } = Typography;

const LandingPage = () => {
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const token = useCustomToken();
  const [form] = Form.useForm();

  useEffect(() => {
    document.title = "Landing Page - Mr. Lim's Card Game";
  }, []);

  const handleCreateGame = async () => {
    try {
      const data = await createGameAPI();
      const createPlayerData = await addPlayerAPI(name, data.session_id);
      saveToken(createPlayerData.token);
      navigate(`/game/${data.session_id}/${createPlayerData.player.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoinGame = async () => {
    try {
      const createPlayerData = await addPlayerAPI(name, sessionId);
      saveToken(createPlayerData.token);
      navigate(`/game/${sessionId}/${createPlayerData.player.id}`);
    } catch (error) {
      console.error(error);
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          style={{
            width: 400,
            textAlign: "center",
            transition: "all 0.3s ease-in-out",
            overflow: "hidden",
          }}
        >
          <Title level={2} style={{ color: token.greenAccent[500] }}>Mr. Lim Card Game</Title>
          <div
            style={{
              overflow: "hidden",
              transition: "max-height 0.3s ease-in-out",
            }}
          >
            <Form name="start-game" style={{ maxWidth: 360, margin: "0 auto" }}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your name" }]}
                validateTrigger="onBlur"
              >
                <Input
                  placeholder="Player Name"
                  size="large"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => form.validateFields(["name"])}
                />
              </Form.Item>
              <Form.Item name="game-session">
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    placeholder="Game Room (6 Characters)"
                    size="large"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    maxLength={6}
                  />
                  <Button
                    size="large"
                    type="primary"
                    onClick={handleJoinGame}
                    disabled={sessionId.length !== 6 || name.length === 0}
                  >
                    Join Game
                  </Button>
                </Space.Compact>
              </Form.Item>
              {name.length > 0 && (
                <Form.Item>
                  <Button
                    size="large"
                    type="primary"
                    onClick={handleCreateGame}
                  >
                    Create Game
                  </Button>
                </Form.Item>
              )}
            </Form>
          </div>
        </Card>
        <Modal
          title={
            <span style={{ color: token.redAccent[500] }}>
              Game Room Not Found
            </span>
          }
          open={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
          okText="OK"
        >
          <p className="text-primary font-sans" style={{ color: token.redAccent[300] }}>
            Game room not found. Please check the Game Room and try again.
          </p>
        </Modal>
      </div>
    </>
  );
};

export default LandingPage;
