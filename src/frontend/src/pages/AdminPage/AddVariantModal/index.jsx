import { Modal } from "antd";

const AddVariantModal = (props) => {
  return (
    <Modal
      title="Thêm biến thể"
      visible={props.visible}
      onOk={props.handleOk}
      confirmLoading={props.confirmLoading}
      onCancel={props.handleCancel}
    >
      <p>QQ gì dãy</p>
    </Modal>
  );
};

export default AddVariantModal;
