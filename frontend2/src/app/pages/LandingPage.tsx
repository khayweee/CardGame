"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "../utils/auth";
import { useResizeObserver } from "../hooks/useResizeObserver";
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
import { useCustomToken } from "@/theme";

const { Title } = Typography;

const LandingPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentHeight = useResizeObserver(contentRef);
  const [maxHeight, setMaxHeight] = useState("auto");
  const [prevHeight, setPrevHeight] = useState(0);

  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // Game room not found modal
  const router = useRouter();
  const token = useCustomToken();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!contentRef.current) return;

    // Animate to new height
    if (contentHeight !== prevHeight) {
      // Set height immediately to current known value
      setMaxHeight(`${prevHeight}px`);

      // Animate to next value in the next tick (force reflow)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMaxHeight(`${contentHeight}px`);
          setPrevHeight(contentHeight);
        });
      });
    }
  }, [contentHeight, prevHeight]);

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
        <Card
          style={{
            width: 400,
            textAlign: "center",
            transition: "all 0.3s ease-in-out",
            overflow: "hidden",
          }}
          variant="outlined"
        >
          <Title level={2} style={{ color: token.greenAccent[700] }}>
            Mr. Lim Card Game
          </Title>
          <div
            className="card-body-wrapper fade-in"
            style={{
              maxHeight,
            }}
          >
            <div ref={contentRef}>
              <Form
                name="start-game"
                style={{ maxWidth: 360, margin: "0 auto" }}
              >
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name" },
                  ]}
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
                  <div className="fade-in">
                    <Form.Item>
                      <Flex justify="center">
                        <Button
                          size="large"
                          type="primary"
                          onClick={handleCreateGame}
                        >
                          Create Game
                        </Button>
                      </Flex>
                    </Form.Item>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </Card>
      </Flex>
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
        <p style={{ color: token.redAccent[500] }}>
          Game room not found. Please check the Game Room and try again.
        </p>
      </Modal>
    </>
  );
};

export default LandingPage;
