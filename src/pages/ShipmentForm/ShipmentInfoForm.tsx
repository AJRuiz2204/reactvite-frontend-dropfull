/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { FormInstance } from "antd/lib/form";

export interface ShipmentData {
  id?: number;
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
  packages: any[];
}

interface ShipmentInfoFormProps {
  form: FormInstance<any>;
  initialValues?: ShipmentData;
  onNext: () => void;
}

interface Option {
  department: string;
  municipalities: string[];
}

const departments: Option[] = [
  {
    department: "Ahuachapán",
    municipalities: [
      "Ahuachapán",
      "Atiquizaya",
      "Apaneca",
      "Concepción de Ataco",
      "Guaymango",
      "Jujutla",
      "San Francisco Menéndez",
      "San Lorenzo",
      "San Pedro",
      "Puxtla",
      "Tacuba",
    ],
  },
  {
    department: "Santa Ana",
    municipalities: [
      "Candelaria de la Frontera",
      "Chalchuapa",
      "Coatepeque",
      "El Congo",
      "El Porvenir",
      "Masahuat",
      "Metapán",
      "San Antonio Pajonal",
      "San Sebastián Salitrillo",
      "Santa Ana",
      "Santa Rosa Guachipilín",
      "Santiago de la Frontera",
      "Texistepeque",
    ],
  },
  {
    department: "Sonsonate",
    municipalities: [
      "Santa Isabel Ishuatán",
      "San Julián",
      "Sonsonate",
      "Juayúa",
      "Nahuizalco",
      "Acajutla",
      "Izalco",
      "Salcoatitán",
      "Caluco",
      "Sonzacate",
      "Armenia",
      "San Antonio del Monte",
      "Santa Catarina Masahuat",
      "Santo Domingo de Guzmán",
      "Nahulingo",
      "Cuisnahuat",
    ],
  },
  {
    department: "Chalatenango",
    municipalities: [
      "Chalatenango",
      "Agua Caliente",
      "Arcatao",
      "Nueva Concepción",
      "San Rafael",
      "San Fernando",
      "Potonico",
      "Santa Rita",
      "San Isidro Labrador",
      "San Antonio de la Cruz",
      "Tejutla",
      "Azacualpa",
      "Comalapa",
      "Citalá",
      "Concepción Quezaltepeque",
      "Dulce Nombre de María",
      "El Carrizal",
      "El Paraíso",
      "La Laguna",
      "La Palma",
      "La Reina",
      "Nombre de Jesús",
      "Ojos de agua",
      "San Antonio de Los Ranchos",
      "San Francisco Lempa",
      "San Francisco Morazán",
      "San Ignacio",
      "San José de las Flores",
      "San Luis del Carmen",
      "San Miguel de Mercedes",
      "Las Vueltas",
      "Nueva Trinidad",
      "San José Cancasque",
    ],
  },
  {
    department: "Cuscatlán",
    municipalities: [
      "Candelaria",
      "Cojutepeque",
      "El Carmen",
      "El Rosario",
      "Monte San Juan",
      "Oratorio de Concepción",
      "San Bartolomé Perulapía",
      "San Cristóbal",
      "San José Guayabal",
      "San Pedro Perulapán",
      "San Rafael Cedros",
      "San Ramón",
      "Santa Cruz Analquito",
      "Santa Cruz Michapa",
      "Suchitoto",
      "Tenancingo",
    ],
  },
  {
    department: "San Salvador",
    municipalities: [
      "Aguilares",
      "Apopa",
      "Ayutuxtepeque",
      "Cuscatancingo",
      "Ciudad Delgado",
      "El Paisnal",
      "Guazapa",
      "Ilopango",
      "Mejicanos",
      "Nejapa",
      "Panchimalco",
      "Rosario de Mora",
      "San Marcos",
      "San Martín",
      "San Salvador",
      "Santiago Texacuangos",
      "Santo Tomás",
      "Soyapango",
      "Tonacatepeque",
    ],
  },
  {
    department: "La Libertad",
    municipalities: [
      "Antiguo Cuscatlán",
      "Chiltiupán",
      "Ciudad Arce",
      "Colón",
      "Comasagua",
      "Huizúcar",
      "Jayaque",
      "Jicalapa",
      "La Libertad",
      "Santa Tecla",
      "Nuevo Cuscatlán",
      "San Juan Opico",
      "Quezaltepeque",
      "Sacacoyo",
      "San José Villanueva",
      "San Matías",
      "San Pablo Tacachico",
      "Talnique",
      "Tamanique",
      "Teotepeque",
      "Tepecoyo",
      "Zaragoza",
    ],
  },
  {
    department: "San Vicente",
    municipalities: [
      "Apastepeque",
      "Guadalupe",
      "San Cayetano Istepeque",
      "San Esteban Catarina",
      "San Ildefonso",
      "San Lorenzo",
      "San Sebastián",
      "San Vicente",
      "Santa Clara",
      "Santo Domingo",
      "Tecoluca",
      "Tepetitán",
      "Verapaz",
    ],
  },
  {
    department: "Cabañas",
    municipalities: [
      "Cinquera",
      "Dolores",
      "Guacotecti",
      "Ilobasco",
      "Jutiapa",
      "San Isidro",
      "Sensuntepeque",
      "Tejutepeque",
      "Victoria",
    ],
  },
  {
    department: "La Paz",
    municipalities: [
      "Cuyultitán",
      "El Rosario",
      "Jerusalén",
      "Mercedes La Ceiba",
      "Olocuilta",
      "Paraíso de Osorio",
      "San Antonio Masahuat",
      "San Emigdio",
      "San Francisco Chinameca",
      "San Juan Nonualco",
      "San Juan Talpa",
      "San Juan Tepezontes",
      "San Luis Talpa",
      "San Luis La Herradura",
      "San Miguel Tepezontes",
      "San Pedro Nonualco",
      "San Pedro Masahuat",
      "San Rafael Obrajuelo",
      "Santa María Ostuma",
      "Santiago Nonualco",
      "Tapalhuaca",
      "Zacatecoluca",
    ],
  },
  {
    department: "Usulután",
    municipalities: [
      "Alegría",
      "Berlín",
      "California",
      "Concepción Batres",
      "El Triunfo",
      "Ereguayquín",
      "Estanzuelas",
      "Jiquilisco",
      "Jucuapa",
      "Jucuarán",
      "Mercedes Umaña",
      "Nueva Granada",
      "Ozatlán",
      "Puerto El Triunfo",
      "San Agustín",
      "San Buenaventura",
      "San Dionisio",
      "San Francisco Javier",
      "Santa Elena",
      "Santa María",
      "Santiago de María",
      "Tecapán",
      "Usulután",
    ],
  },
  {
    department: "San Miguel",
    municipalities: [
      "Carolina",
      "Chapeltique",
      "Chinameca",
      "Chirilagua",
      "Ciudad Barrios",
      "Comacarán",
      "El Tránsito",
      "Lolotique",
      "Moncagua",
      "Nueva Guadalupe",
      "Nuevo Edén de San Juan",
      "Quelepa",
      "San Antonio del Mosco",
      "San Gerardo",
      "San Jorge",
      "San Luis de la Reina",
      "San Miguel",
      "San Rafael Oriente",
      "Sesori",
      "Uluazapa",
    ],
  },
  {
    department: "Morazán",
    municipalities: [
      "Arambala",
      "Cacaopera",
      "Chilanga",
      "Corinto",
      "Delicias de Concepción",
      "El Divisadero",
      "El Rosario",
      "Gualococti",
      "Guatajiagua",
      "Joateca",
      "Jocoaitique",
      "Jocoro",
      "Lolotiquillo",
      "Meanguera",
      "Osicala",
      "Perquín",
      "San Carlos",
      "San Fernando",
      "San Francisco Gotera",
      "San Isidro",
      "San Simón",
      "Sensembra",
      "Sociedad",
      "Torola",
      "Yamebal",
      "Yoloaiquín",
    ],
  },
  {
    department: "La Unión",
    municipalities: [
      "Anamorós",
      "Bolívar",
      "Concepción de Oriente",
      "Conchagua",
      "El Carmen",
      "El Sauce",
      "Intipucá",
      "La Unión",
      "Lislique",
      "Meanguera del Golfo",
      "Nueva Esparta",
      "Pasaquina",
      "Polorós",
      "San Alejo",
      "San José",
      "Santa Rosa de Lima",
      "Yayantique",
      "Yucuaiquín",
    ],
  },
];

const ShipmentInfoForm: React.FC<ShipmentInfoFormProps> = ({
  form,
  initialValues,
  onNext,
}) => {
  // Estado para el departamento seleccionado y su lista de municipios
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined);
  const [municipalitiesOptions, setMunicipalitiesOptions] = useState<string[]>([]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);

      if (initialValues.department) {
        setSelectedDepartment(initialValues.department);
        const dept = departments.find(
          (item) => item.department === initialValues.department
        );
        setMunicipalitiesOptions(dept ? dept.municipalities : []);
      }
    }
  }, [initialValues, form]);

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    form.setFieldsValue({ department: value, municipality: undefined });
    const dept = departments.find((item) => item.department === value);
    setMunicipalitiesOptions(dept ? dept.municipalities : []);
  };

  // Validar y avanzar al siguiente paso
  const onFinishForm = () => {
    onNext();
  };

  return (
    <Form 
      form={form} 
      layout="vertical" 
      onFinish={onFinishForm}
      style={{ 
        border: "1px solid #e0e0e0", 
        borderRadius: "8px", 
        padding: "16px" 
      }}
    >
      {/* DIRECCIÓN DE RECOLECCIÓN Y FECHA */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
            Dirección de recolección
          </div>
          <Form.Item
            name="pickupAddress"
            rules={[{ required: true, message: "Campo requerido" }]}
            style={{ marginBottom: 0 }}
          >
            <Input 
              style={{ borderRadius: "8px", height: "48px" }}
            />
          </Form.Item>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
            Fecha Programada
          </div>
          <Form.Item
            name="scheduledDate"
            rules={[{ required: true, message: "Campo requerido" }]}
            style={{ marginBottom: 0 }}
          >
            <Input 
              type="date"
              style={{ borderRadius: "8px", height: "48px" }}
            />
          </Form.Item>
        </div>
      </div>

      {/* DATOS PERSONALES */}
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        {/* NOMBRE Y APELLIDO */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>Nombre</div>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: "Campo requerido" }]}
              style={{ marginBottom: 0 }}
            >
              <Input
                style={{ borderRadius: "8px", height: "48px", border: "1px solid #2684ff" }}
              />
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>Apellido</div>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "Campo requerido" }]}
              style={{ marginBottom: 0 }}
            >
              <Input 
                style={{ borderRadius: "8px", height: "48px" }}
              />
            </Form.Item>
          </div>
        </div>

        {/* EMAIL */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
              Correo Electrónico
            </div>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Campo requerido" }]}
              style={{ marginBottom: 0 }}
            >
              <Input
                style={{ borderRadius: "8px", height: "48px" }}
              />
            </Form.Item>
          </div>
        </div>

        {/* TELÉFONO */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>Teléfono</div>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Campo requerido" }]}
              style={{ marginBottom: 0 }}
            >
              <Input
                style={{ borderRadius: "8px", height: "48px" }}
              />
            </Form.Item>
          </div>
        </div>

        {/* DIRECCIÓN DESTINO */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
              Dirección del destinatario
            </div>
            <Form.Item
              name="destinationAddress"
              rules={[{ required: true, message: "Campo requerido" }]}
              style={{ marginBottom: 0 }}
            >
              <Input 
                style={{ borderRadius: "8px", height: "48px" }}
              />
            </Form.Item>
          </div>
        </div>

        {/* DEPARTAMENTO Y MUNICIPIO */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
              Departamento
            </div>
            <Form.Item
              name="department"
              rules={[{ required: true, message: "Campo requerido" }]}
              style={{ marginBottom: 0 }}
            >
              <Select
                style={{ width: "100%", height: "48px", borderRadius: "8px" }}
                onChange={handleDepartmentChange}
                value={selectedDepartment}
              >
                {departments.map((dept) => (
                  <Select.Option key={dept.department} value={dept.department}>
                    {dept.department}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
              Municipio
            </div>
            <Form.Item
              name="municipality"
              rules={[{ required: true, message: "Campo requerido" }]}
              style={{ marginBottom: 0 }}
            >
              <Select
                style={{ width: "100%", height: "48px", borderRadius: "8px" }}
                disabled={!selectedDepartment}
              >
                {municipalitiesOptions.map((mun) => (
                  <Select.Option key={mun} value={mun}>
                    {mun}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        {/* PUNTOS DE REFERENCIA */}
        <div style={{ display: "flex", gap: "16px", marginBottom: 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
              Punto de Referencia
            </div>
            <Form.Item
              name="referencePoints"
              rules={[{ required: true, message: "Campo requerido" }]}
              style={{ marginBottom: 0 }}
            >
              <Input
                style={{ borderRadius: "8px", height: "48px" }}
              />
            </Form.Item>
          </div>
        </div>

        {/* INDICACIONES */}
        <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
              Indicaciones
            </div>
            <Form.Item name="comments" style={{ marginBottom: 0 }}>
              <Input
                style={{ borderRadius: "8px", height: "48px" }}
              />
            </Form.Item>
          </div>
        </div>
      </div>

      {/* BOTÓN SIGUIENTE */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            height: "48px",
            borderRadius: "8px",
            backgroundColor: "#4262ff",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          <span>Siguiente</span>
          <span style={{ marginLeft: "8px" }}>→</span>
        </Button>
      </div>
    </Form>
  );
};

export default ShipmentInfoForm;
