import React, { useEffect }from "react";
import { Button, Form, Input, InputNumber, DatePicker } from "antd";
import swal from "sweetalert2";
import { useForm } from "antd/lib/form/Form";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

import voucherService from "services/voucher";
import formatter from "utils/formatter";

const AddVoucherSection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const [form] = useForm();

  const onFinish = async (values) => {
    console.log(values);
    try {
      values.startDate = formatter.formatDate(values.startDate);
      values.endDate = formatter.formatDate(values.endDate);
      const res = await voucherService.createVoucher(values);
      console.log(res.data);
      if (res.data.exitcode === 0) {
        swal.fire(t("voucher.addSuccess"), "", "success");
        form.resetFields();
      } else {
        swal.fire({
          title: t("voucher.addFail"),
          text: `Lỗi: ${res.data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      swal.fire({
        title: t("voucher.addFail"),
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
          label={t("voucher.voucherCode")}
          name="voucherCode"
          rules={[
            {
              required: true,
              message: t("voucher.pleaseEnterCode"),
            },
          ]}
        >
          <Input placeholder={t("voucher.enterCode")}/>
        </Form.Item>

        <Form.Item
          label={t("voucher.minimumPrice")}
          name="minimumPrice"
          rules={[
            {
              required: true,
              message: t("voucher.pleaseEnterMinimumPrice"),
            },
          ]}
        >
          <InputNumber
            placeholder={t("voucher.enterPrice")}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label={t("voucher.maximumDiscountPrice")}
          name="maximumDiscountPrice"
          rules={[
            {
              required: true,
              message: t("voucher.pleaseMaximumDiscountPrice"),
            },
          ]}
        >
          <InputNumber
            placeholder={t("voucher.enterPrice")}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label={t("voucher.percentDiscount")}
          name="percentageDiscount"
          rules={[
            {
              required: true,
              message: t("voucher.pleasePercentDiscount"),
            },
          ]}
        >
          <InputNumber
            min={0}
            max={100}
            placeholder={t("voucher.enterPercentDiscount")}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label={t("voucher.maximumUsage")}
          name="maximumUsage"
          rules={[
            {
              required: true,
              message: t("voucher.pleaseMaximumUsage"),
            },
          ]}
        >
          <InputNumber
            min={0}
            placeholder={t("voucher.enterMaximumUsage")}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <div className="flex-container ">
          <div className="flex-item mr-5">
            <Form.Item
              label={t("voucher.startDate")}
              name="startDate"
              rules={[
                {
                  required: true,
                  message: t("voucher.pleaseStartDate"),
                },
              ]}
            >
              <DatePicker placeholder={t("voucher.enterDate")} style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <div className="flex-item">
            <Form.Item
              label={t("voucher.endDate")}
              name="endDate"
              rules={[
                {
                  required: true,
                  message: t("voucher.pleaseEndDate"),
                },
              ]}
            >
              <DatePicker placeholder={t("voucher.enterDate")} style={{ width: "100%" }} />
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
              {t("voucher.add")}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddVoucherSection;
