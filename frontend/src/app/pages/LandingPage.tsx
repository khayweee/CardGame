"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "../utils/auth";
import {
  Button,
  Input,
  Form,
  Flex,
  Typography,
  Card,
  Space,
  Modal,
} from "antd";

const { Title } = Typography;

const LandingPage = () => {
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // Game room not found modal
  const router = useRouter();

  const handleCreateGame = async () => {
    const createGameResponse = await fetch(
      "https://localhost:8000/game/create-game",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await createGameResponse.json();
    const createPlayerResponse = await fetch(
      "https://localhost:8000/game/add-player",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, session_id: data.session_id }),
      }
    );
    const createPlayerData = await createPlayerResponse.json();
    console.log(createPlayerData);
    saveToken(createPlayerData.token); // Save the token to local storage
    // Pass the token to the next page
    router.push(`/game/${data.session_id}/${createPlayerData.player.id}`);
  };

  const handleJoinGame = async () => {
    try {
      const createPlayerResponse = await fetch(
        "https://localhost:8000/game/add-player",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId, name: name }),
        }
      );
      if (!createPlayerResponse.ok) {
        throw new Error("Game session not found");
      }
      const createPlayerData = await createPlayerResponse.json();

      // Save the token to local storage
      saveToken(createPlayerData.token);

      // Pass the token to the next page
      router.push(`/game/${sessionId}/${createPlayerData.player.id}`);
    } catch (error) {
      console.error(error);
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <Flex
        className="landing-page"
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card style={{ width: 400, textAlign: "center" }} bordered={true}>
          <Title level={2}>Mr. Lim Card Game</Title>
          <Form name="start-game" style={{ maxWidth: 360, margin: "0 auto" }}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                placeholder="Player Name"
                size="large"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="game-session">
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  placeholder="Game Room"
                  size="large"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                />
                <Button size="large" type="primary" onClick={handleJoinGame}>
                  Join
                </Button>
              </Space.Compact>
            </Form.Item>
            <Form.Item>
              <Flex justify="center">
                <Button size="large" type="primary" onClick={handleCreateGame}>
                  Create Game
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
      <Modal
        title="Game Room Not Found"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        okText="OK"
      >
        <p>Game room not found. Please check the Game Room and try again.</p>
      </Modal>
    </>
  );
};

export default LandingPage;
