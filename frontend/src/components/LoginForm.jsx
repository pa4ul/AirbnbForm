import React, { useState, useContext } from "react";
import { Form, Input, Button, notification, Card } from "antd";
import api from "../api";
import AuthContext from "../contexts/AuthContext";
import "../styles/LoginForm.css";
import { useNavigate } from "react-router-dom"; // Importiere useNavigate

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext); // Verwende den AuthContext
  const navigate = useNavigate(); // Initialisiere useNavigate

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/jwt/create", {
        username: values.username,
        password: values.password,
      });
      login(response.data);

      notification.success({
        message: "Login Successful",
        description: "You have logged in successfully.",
      });

      setLoading(false);
      navigate("/overview");
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Login Failed",
        description: "The login attempt failed. Please check your credentials.",
      });
    }
  };

  return (
    <div className="login-container">
      <Card title="Admin Login" className="login-card">
        <Form
          name="login"
          onFinish={onFinish}
          style={{ maxWidth: 400, margin: "auto" }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
