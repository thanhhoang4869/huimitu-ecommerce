import React from "react";

import { Input, Button, Form, Select } from "antd";
import "./style.css";

const { Option } = Select;
const formRef = React.createRef();

const ShippingInformationForm = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    formRef.current.resetFields();
  };
  const onFill = () => {
    formRef.current.setFieldsValue({
      address: "Test",
    });
  };

  return (
    <div>
      <Form
        style={{ justifySelf: "start", textAlign: "left" }}
        ref={formRef}
        name="control-ref"
        onFinish={onFinish}
      >
        <div className="flex-container">
          <Form.Item
            className="flex-item mr-3"
            name="city"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Tỉnh/Thành phố" allowClear></Select>
          </Form.Item>

          <Form.Item
            className="flex-item ml-3"
            name="district"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Quận/Huyện" allowClear></Select>
          </Form.Item>
        </div>

        <div className="flex-container">
          <Form.Item
            className="flex-item mr-3"
            name="ward"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Phường/Xã" allowClear></Select>
          </Form.Item>

          <Form.Item
            name="address"
            className="flex-item ml-3"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Số nhà" />
          </Form.Item>
        </div>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.gender !== currentValues.gender
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("gender") === "other" ? (
              <Form.Item
                name="customizeGender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item>
          <div className="pick-address" onClick={onFill}>
            Chọn địa chỉ có sẵn
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShippingInformationForm;
