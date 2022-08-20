import { useEffect } from "react";
import { InputNumber, Modal } from "antd";
import { Button, Form, Input } from "antd";
import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const AddVariantModal = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const onFinish = async (values) => {
    props.handleSuccess(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={t("variant.addVariant")}
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
          label={t("variant.variantName")}
          name="variantName"
          rules={[
            {
              required: true,
              message: t("variant.pleaseName"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("variant.price")}
          name="price"
          rules={[
            {
              required: true,
              message: t("variant.pleasePrice"),
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

        <Form.Item label={t("variant.discountPrice")} name="discountPrice">
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
          label={t("variant.stock")}
          name="stock"
          rules={[
            {
              required: true,
              message: t("variant.pleaseStock"),
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
              {t("variant.cancel")}
            </Button>
            <Button type="primary" htmlType="submit">
              {t("variant.add")}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddVariantModal;
