import React from "react";
import { Button, Form, Input, InputNumber, DatePicker } from "antd";
import swal from "sweetalert2";
import { useForm } from "antd/lib/form/Form";

import voucherService from "services/voucher";

const AddVoucherSection = () => {
  const [form] = useForm();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const res = await voucherService.createVoucher(values);
      console.log(res.data);
      if (res.data.exitcode === 0) {
        swal.fire("Thêm voucher thành công", "", "success");
        form.resetFields();
      } else {
        swal.fire({
          title: "Thêm voucher thất bại",
          text: `Lỗi: ${res.data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      swal.fire({
        title: "Thêm voucher thất bại",
        text: `Lỗi: ${error}`,
        icon: "error",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Mã voucher"
          name="voucherCode"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã voucher!",
            },
          ]}
        >
          <Input placeholder="Nhập mã" />
        </Form.Item>

        <Form.Item
          label="Giá tối thiểu"
          name="minimumPrice"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá tối thiểu!",
            },
          ]}
        >
          <InputNumber
            placeholder="Nhập giá"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Giá giảm tối đa"
          name="maximumDiscountPrice"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá giảm tối đa!",
            },
          ]}
        >
          <InputNumber
            placeholder="Nhập giá"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Phần trăm giảm (%)"
          name="percentageDiscount"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập % giảm!",
            },
          ]}
        >
          <InputNumber
            min={0}
            max={100}
            placeholder="Nhập phần trăm"
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <div className="flex-container ">
          <div className="flex-item mr-5">
            <Form.Item
              label="Ngày bắt đầu"
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ngày bắt đầu!",
                },
              ]}
            >
              <DatePicker placeholder="Chọn ngày" style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <div className="flex-item">
            <Form.Item
              label="Ngày kết thúc"
              name="endDate"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ngày kết thúc!",
                },
              ]}
            >
              <DatePicker placeholder="Chọn ngày" style={{ width: "100%" }} />
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <div
            style={{
              textAlign: "end",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
            >
              Thêm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddVoucherSection;
