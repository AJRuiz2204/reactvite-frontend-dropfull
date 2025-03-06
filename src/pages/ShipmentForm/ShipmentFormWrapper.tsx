import React, { useState } from "react";
import { Form } from "antd";
import ShipmentInfoForm, { ShipmentData } from "./ShipmentInfoForm";
import PackagesForm from "./PackagesForm";

interface ShipmentFormWrapperProps {
  editingShipment?: ShipmentData | null;
  onFinish?: () => void;
}

const ShipmentFormWrapper: React.FC<ShipmentFormWrapperProps> = ({
  editingShipment,
  onFinish,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm<ShipmentData>();

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(1);
    });
  };

  const handleBack = () => {
    setCurrentStep(0);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "16px" }}>
      {currentStep === 0 ? (
        <ShipmentInfoForm
          form={form}
          initialValues={editingShipment ? editingShipment : undefined}
          onNext={handleNext}
        />
      ) : (
        <PackagesForm
          shipmentForm={form}
          editingShipment={editingShipment}
          onBack={handleBack}
          onFinish={onFinish}
        />
      )}
    </div>
  );
};

export default ShipmentFormWrapper;
