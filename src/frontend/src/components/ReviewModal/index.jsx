import React, { useState, useEffect} from 'react';
import { InputNumber, Modal } from "antd";
import { Button, Form, Input, Rate } from "antd";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const ReviewModal = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const [ratingValue, setRatingValue] = useState(5);

  const onFinish = async (values) => {
    values.comment = values.comment.replace(/\s+/g, ' ').trim();
    const data = {
      rating: ratingValue,
      ...values
    }
    props.handleSuccess(data)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={t("rating.addRating")}
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
          label={t("rating.rating")}
          name="rating"
          rules={[
            {
              required: true,
              message: t("rating.pleaseRating"),
            }
          ]}
        >
          <Rate onChange={setRatingValue} value={ratingValue} />

        </Form.Item>

        <Form.Item
          label={t("rating.comment")}
          name="comment"
        >
          <TextArea rows={10} />
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
              {t("rating.cancel")}
            </Button>
            <Button type="primary" htmlType="submit">
              {t("rating.add")}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReviewModal;
