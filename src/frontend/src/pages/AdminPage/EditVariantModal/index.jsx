import { InputNumber, Modal } from "antd";
import { Button, Form, Input } from "antd";

const EditVariantModal = (props) => {
  const onFinish = (values) => {
    values = {
      variantId: props.variant.id,
      ...values
    }
    props.handleSuccess(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Chỉnh sửa biến thể"
      destroyOnClose={true}
      visible={props.visible}
      onOk={props.handleOk}
      confirmLoading={props.confirmLoading}
      onCancel={props.handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Tên biến thể"
          name="variantName"
          initialValue={props.variant.variantName}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          initialValue={props.variant.price}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá!",
            },
          ]}
        >
          <InputNumber
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Giá giảm"
          name="discountPrice"
          initialValue={props.variant.discountPrice}
        >
          <InputNumber
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="stock"
          initialValue={props.variant.stock}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng!",
            },
          ]}
        >
          <InputNumber
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item>
          <div
            style={{
              textAlign: "end",
            }}
          >
            <Button
              htmlType="button"
              className="mr-3"
              onClick={props.handleCancel}
            >
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditVariantModal;
