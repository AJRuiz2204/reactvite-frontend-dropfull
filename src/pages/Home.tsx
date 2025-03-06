/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Home.tsx
import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Button, message, Modal, Table } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ShipmentFormWrapper from "./ShipmentForm/ShipmentFormWrapper";
import { getShipments } from "../services/shipments";

const { Header, Content, Footer } = Layout;

interface Shipment {
  id: number;
  pickupAddress: string;
  scheduledDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  destinationAddress: string;
  department: string;
  municipality: string;
  referencePoints: string;
  comments?: string;
  packages: {
    length: number;
    width: number;
    height: number;
    weight: number;
    content: string;
  }[];
}

const Home: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const response = await getShipments();
      setShipments(response);
    } catch (error: any) {
      message.error("Error al cargar los envíos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Dirección de recolección", dataIndex: "pickupAddress" },
    { title: "Fecha Programada", dataIndex: "scheduledDate" },
    { title: "Nombre", dataIndex: "firstName" },
    { title: "Apellido", dataIndex: "lastName" },
    { title: "Email", dataIndex: "email" },
    { title: "Teléfono", dataIndex: "phone" },
    { title: "Dirección de destino", dataIndex: "destinationAddress" },
    { title: "Departamento", dataIndex: "department" },
    { title: "Municipio", dataIndex: "municipality" },
    { title: "Puntos de referencia", dataIndex: "referencePoints" },
    { title: "Comentarios", dataIndex: "comments" },
    {
      title: "Acciones",
      render: (_: any, record: Shipment) => (
        <Button
          onClick={() => {
            setEditingShipment(record);
            setIsModalVisible(true);
          }}
        >
          Editar
        </Button>
      ),
    },
  ];

  const handleModalClose = () => {
    setEditingShipment(null);
    setIsModalVisible(false);
    fetchShipments();
  };

  const menuItems = [
    {
      key: "shipments",
      label: <Link to="/shipments">Nuevo Envío</Link>,
    },
    {
      key: "list",
      label: (
        <Button type="link" onClick={fetchShipments} style={{ color: "#fff" }}>
          Lista de Envíos
        </Button>
      ),
    },
    {
      key: "logout",
      label: (
        <Button type="link" onClick={logout} style={{ color: "#fff" }}>
          Cerrar Sesión
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Header>
        <div style={{ color: "#fff", float: "left", marginRight: "1rem" }}>
          {user ? `Bienvenido, ${user.firstName} ${user.lastName}` : ""}
        </div>
        <Menu theme="dark" mode="horizontal" selectable={false} items={menuItems} />
      </Header>
      <Content style={{ padding: "2rem" }}>
        <Table dataSource={shipments} columns={columns} loading={loading} rowKey="id" />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Prueba Técnica BoxFul ©2025
      </Footer>

      <Modal
        title="Editar Envío"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose
      >
        {isModalVisible && (
          <ShipmentFormWrapper editingShipment={editingShipment} onFinish={handleModalClose} />
        )}
      </Modal>
    </Layout>
  );
};

export default Home;
