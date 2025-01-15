import React from "react";
import { Modal, Button } from "antd";

interface OrderCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const OrderCompletionModal: React.FC<OrderCompletionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      title="Confirm order completion"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Confirm
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to close this order and mark it as completed?
        Please confirm that the customer has completed their payment before
        proceeding.
      </p>
    </Modal>
  );
};

export default OrderCompletionModal;
