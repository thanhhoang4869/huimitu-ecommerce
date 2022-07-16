import React from "react";

import { Input, Button, Form, Select } from "antd";
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
      note: "Hello world!",
      gender: "male",
    });
  };

  return (
    <div>
      {" "}
      <Form
        style={{ justifySelf: "start", textAlign: "left" }}
        ref={formRef}
        name="control-ref"
        onFinish={onFinish}
      >
        <Form.Item
          name="note"
          label="Note"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
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
                label="Customize Gender"
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
          <Button type="primary">Submit</Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShippingInformationForm;
