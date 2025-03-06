/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/boxful.jpeg";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [emailAutoComplete, setEmailAutoComplete] = useState("off");
  const [passwordAutoComplete, setPasswordAutoComplete] = useState("off");

  const onFinish = async (values: any) => {
    try {
      const response = await api.post("/auth/login", values);
      const token = response.data.access_token;
      login(token);
      message.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error: any) {
      message.error("Credenciales inválidas");
    }
  };

  const orangeColor = "#FF7A00";
  const lightOrangeColor = "#FFF0E0";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderColor: lightOrangeColor,
        }}
        styles={{ body: { padding: "40px" } }}
        variant="outlined"
      >
        <div style={{ marginBottom: 30 }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginBottom: 20 }} />
          <Title level={2} style={{ color: orangeColor, marginBottom: 0 }}>
            Bienvenido
          </Title>
          <Text type="secondary">Accede a tu cuenta</Text>
        </div>
        <Form
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          size="large"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Ingrese su email" },
              { type: "email", message: "Por favor ingrese un email válido" },
            ]}
          >
            <Input
              autoComplete={emailAutoComplete}
              onFocus={() => setEmailAutoComplete("on")}
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="tucorreo@example.com"
              style={{ borderColor: lightOrangeColor }}
            />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Ingrese su contraseña" }]}
          >
            <Input.Password
              autoComplete={passwordAutoComplete}
              onFocus={() => setPasswordAutoComplete("on")}
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Contraseña"
              style={{ borderColor: lightOrangeColor }}
            />
          </Form.Item>

          <div style={{ textAlign: "right", marginBottom: 16 }}>
            <Link to="/forgot-password" style={{ color: orangeColor }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: orangeColor,
                borderColor: orangeColor,
                height: 45,
                borderRadius: 6,
                fontWeight: 500,
              }}
            >
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Text type="secondary">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              style={{ color: orangeColor, fontWeight: 500 }}
            >
              Regístrate
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
