/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Row, Col, Card, Form, Input, Button, Typography, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import logo from "../assets/boxful.jpeg";

const { Title, Text } = Typography;

const Register: React.FC = () => {
  const navigate = useNavigate();

  // Opcional: Para manejar autocompletado (igual que en Login)
  const [emailAutoComplete, setEmailAutoComplete] = useState("off");
  const [passwordAutoComplete, setPasswordAutoComplete] = useState("off");

  // Paleta de colores
  const orangeColor = "#FF7A00";
  const lightOrangeColor = "#FFF0E0";

  const onFinish = async ({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
  }) => {
    try {
      await api.post("/auth/register", {
        email,
        password,
        firstName,
        lastName,
      });
      message.success("Registro exitoso");
      navigate("/login");
    } catch (error: any) {
      message.error("Error en el registro");
    }
  };

  return (
    <Row
      style={{
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        backgroundColor: "#FFFFFF",
      }}
      justify="center"
      align="middle"
    >
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
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
            bodyStyle={{ padding: "40px" }}
            bordered={false}
          >
            <div style={{ marginBottom: 30 }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: 40, marginBottom: 20 }}
              />
              <Title level={2} style={{ color: orangeColor, marginBottom: 0 }}>
                Registro
              </Title>
              <Text type="secondary">Crea tu cuenta</Text>
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
                  {
                    type: "email",
                    message: "Por favor ingrese un email válido",
                  },
                ]}
              >
                <Input
                  autoComplete={emailAutoComplete}
                  onFocus={() => setEmailAutoComplete("on")}
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
                  placeholder="Contraseña"
                  style={{ borderColor: lightOrangeColor }}
                />
              </Form.Item>

              <Form.Item
                label="Nombre"
                name="firstName"
                rules={[{ required: true, message: "Ingrese su nombre" }]}
              >
                <Input style={{ borderColor: lightOrangeColor }} />
              </Form.Item>

              <Form.Item label="Apellido" name="lastName">
                <Input style={{ borderColor: lightOrangeColor }} />
              </Form.Item>

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
                  Registrarse
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Text type="secondary">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  style={{ color: orangeColor, fontWeight: 500 }}
                >
                  Inicia sesión
                </Link>
              </Text>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default Register;
