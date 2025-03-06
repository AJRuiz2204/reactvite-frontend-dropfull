/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

// Crea un envío (shipment)
export const createShipment = async (shipmentData: any): Promise<any> => {
  const response = await api.post("/shipments", shipmentData);
  return response.data;
};

// Actualiza un envío existente (requiere ID)
export const updateShipment = async (
  id: number,
  shipmentData: any
): Promise<any> => {
  const response = await api.put(`/shipments/${id}`, shipmentData);
  return response.data;
};

// Elimina un envío por ID
export const deleteShipment = async (id: number): Promise<any> => {
  const response = await api.delete(`/shipments/${id}`);
  return response.data;
};

// Obtiene todos los envíos
export const getShipments = async (): Promise<any> => {
  const response = await api.get("/shipments");
  return response.data;
};
