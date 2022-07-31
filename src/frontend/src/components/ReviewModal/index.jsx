import React, { useState } from 'react';
import { InputNumber, Modal } from "antd";
import { Button, Form, Input, Rate } from "antd";

const { TextArea } = Input;

const ReviewModal = (props) => {

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
      title="Thêm đánh giá"
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
          label="Đánh giá"
          name="rating"
          rules={[
            {
              required: true,
              message: "Vui lòng đánh giá!",
            }
          ]}
        >
          <Rate onChange={setRatingValue} value={ratingValue} />

        </Form.Item>

        <Form.Item
          label="Bình luận"
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
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReviewModal;
