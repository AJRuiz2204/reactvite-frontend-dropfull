/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Button, Input, InputNumber, message } from "antd";
import { createShipment, updateShipment } from "../../services/shipments";

interface PackageData {
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  content: string;
}

interface ShipmentData {
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
  packages: PackageData[];
}

interface PackagesFormProps {
  shipmentForm: any;
  editingShipment?: ShipmentData | null;
  onBack: () => void;
  onFinish?: () => void;
}

const PackagesForm: React.FC<PackagesFormProps> = ({
  shipmentForm,
  editingShipment,
  onBack,
  onFinish,
}) => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [packageForm, setPackageForm] = useState<PackageData>({
    length: undefined,
    width: undefined,
    height: undefined,
    weight: undefined,
    content: "",
  });

  useEffect(() => {
    if (editingShipment) {
      setPackages(editingShipment.packages);
    }
  }, [editingShipment]);

  const addPackage = () => {
    setPackages([...packages, packageForm]);
    setPackageForm({
      length: undefined,
      width: undefined,
      height: undefined,
      weight: undefined,
      content: "",
    });
  };

  const removePackage = (index: number) => {
    const updated = [...packages];
    updated.splice(index, 1);
    setPackages(updated);
  };

  const submitForm = async () => {
    try {
      const shipmentValues = shipmentForm.getFieldsValue();

      if (shipmentValues.scheduledDate) {
        const convertedDate = new Date(shipmentValues.scheduledDate);
        if (isNaN(convertedDate.getTime())) {
          message.error("Fecha 'scheduledDate' no válida");
          return;
        }
        shipmentValues.scheduledDate = convertedDate.toISOString();
      }
      const payload: ShipmentData = { ...shipmentValues, packages };

      if (editingShipment) {
        await updateShipment(editingShipment.id!, payload);
        message.success("Envío actualizado correctamente");
      } else {
        await createShipment(payload);
        message.success("Envío creado correctamente");
        shipmentForm.resetFields();
        setPackages([]);
      }
      if (onFinish) {
        onFinish();
      }
    } catch {
      message.error("Error al enviar el envío");
    }
  };

  return (
    <div style={{ background: "white", borderRadius: "8px", padding: "24px" }}>
      <h3 style={{ color: "#6e6e80", marginBottom: "16px" }}>
        Agrega tus bultos
      </h3>

      <div
        style={{
          background: "#f8f9fc",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        {/* Formulario para agregar un nuevo paquete */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <div>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>Largo</div>
            <div style={{ display: "flex" }}>
              <InputNumber
                value={packageForm.length}
                onChange={(value) =>
                  setPackageForm({ ...packageForm, length: value === null ? undefined : value })
                }
                style={{
                  width: "100%",
                  borderRadius: "4px 0 0 4px",
                  height: "48px",
                }}
              />
              <div
                style={{
                  background: "#f1f1f3",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  borderRadius: "0 4px 4px 0",
                  border: "1px solid #d9d9d9",
                  borderLeft: "none",
                }}
              >
                cm
              </div>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>Alto</div>
            <div style={{ display: "flex" }}>
              <InputNumber
                value={packageForm.height}
                onChange={(value) =>
                  setPackageForm({ ...packageForm, height: value === null ? undefined : value })
                }
                style={{
                  width: "100%",
                  borderRadius: "4px 0 0 4px",
                  height: "48px",
                }}
              />
              <div
                style={{
                  background: "#f1f1f3",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  borderRadius: "0 4px 4px 0",
                  border: "1px solid #d9d9d9",
                  borderLeft: "none",
                }}
              >
                cm
              </div>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>Ancho</div>
            <div style={{ display: "flex" }}>
              <InputNumber
                value={packageForm.width}
                onChange={(value) =>
                  setPackageForm({ ...packageForm, width: value === null ? undefined : value })
                }
                style={{
                  width: "100%",
                  borderRadius: "4px 0 0 4px",
                  height: "48px",
                }}
              />
              <div
                style={{
                  background: "#f1f1f3",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  borderRadius: "0 4px 4px 0",
                  border: "1px solid #d9d9d9",
                  borderLeft: "none",
                }}
              >
                cm
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
              Peso en libras
            </div>
            <div style={{ display: "flex" }}>
              <InputNumber
                value={packageForm.weight}
                onChange={(value) =>
                  setPackageForm({ ...packageForm, weight: value === null ? undefined : value })
                }
                style={{
                  width: "100%",
                  borderRadius: "4px",
                  height: "48px",
                }}
              />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
              Contenido
            </div>
            <Input
              value={packageForm.content}
              onChange={(e) =>
                setPackageForm({ ...packageForm, content: e.target.value })
              }
              style={{
                width: "100%",
                borderRadius: "4px",
                height: "48px",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={addPackage}
            style={{
              borderRadius: "8px",
              background: "#fff",
              border: "1px solid #e0e0e0",
              height: "48px",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
            }}
          >
            <span style={{ marginRight: "8px" }}>Agregar</span>
            <span>+</span>
          </Button>
        </div>
      </div>

      {packages.length > 0 && (
        <div style={{ marginTop: "16px", marginBottom: "32px" }}>
          <h3
            style={{
              color: "#6e6e80",
              fontWeight: "normal",
              marginBottom: "16px",
            }}
          >
            Agrega tus bultos
          </h3>

          {packages.map((pkg, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #4cd964",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
                    Peso en libras
                  </div>
                  <div style={{ display: "flex" }}>
                    <Input
                      value={`${pkg.weight} lb`}
                      disabled
                      style={{
                        width: "100%",
                        borderRadius: "4px",
                        height: "48px",
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
                    Contenido
                  </div>
                  <Input
                    value={pkg.content}
                    disabled
                    style={{
                      width: "100%",
                      borderRadius: "4px",
                      height: "48px",
                      background: "#fff",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
                    Largo
                  </div>
                  <div style={{ display: "flex" }}>
                    <InputNumber
                      value={pkg.length}
                      disabled
                      style={{
                        width: "100%",
                        borderRadius: "4px 0 0 4px",
                        height: "48px",
                        background: "#fff",
                      }}
                    />
                    <div
                      style={{
                        background: "#f1f1f3",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 8px",
                        borderRadius: "0 4px 4px 0",
                        border: "1px solid #d9d9d9",
                        borderLeft: "none",
                      }}
                    >
                      cm
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
                    Alto
                  </div>
                  <div style={{ display: "flex" }}>
                    <InputNumber
                      value={pkg.height}
                      disabled
                      style={{
                        width: "100%",
                        borderRadius: "4px 0 0 4px",
                        height: "48px",
                        background: "#fff",
                      }}
                    />
                    <div
                      style={{
                        background: "#f1f1f3",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 8px",
                        borderRadius: "0 4px 4px 0",
                        border: "1px solid #d9d9d9",
                        borderLeft: "none",
                      }}
                    >
                      cm
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: "8px", color: "#6e6e80" }}>
                    Ancho
                  </div>
                  <div style={{ display: "flex" }}>
                    <InputNumber
                      value={pkg.width}
                      disabled
                      style={{
                        width: "100%",
                        borderRadius: "4px 0 0 4px",
                        height: "48px",
                        background: "#fff",
                      }}
                    />
                    <div
                      style={{
                        background: "#f1f1f3",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 8px",
                        borderRadius: "0 4px 4px 0",
                        border: "1px solid #d9d9d9",
                        borderLeft: "none",
                      }}
                    >
                      cm
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => removePackage(index)}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "8px",
                  border: "none",
                  background: "transparent",
                  color: "#e54545",
                  fontSize: "18px",
                }}
              >
                🗑️
              </Button>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 0",
        }}
      >
        <Button
          onClick={onBack}
          style={{
            height: "48px",
            borderRadius: "8px",
            background: "#f8f9fc",
            border: "none",
            color: "#4262ff",
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          <span style={{ marginRight: "8px" }}>←</span>
          <span>Regresar</span>
        </Button>

        <Button
          type="primary"
          onClick={submitForm}
          style={{
            height: "48px",
            borderRadius: "8px",
            backgroundColor: "#4262ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          <span>Enviar</span>
          <span style={{ marginLeft: "8px" }}>→</span>
        </Button>
      </div>
    </div>
  );
};

export default PackagesForm;
