import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Radio, Space, Select } from "antd";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

import "./style.css";
import { AccountContext } from "context/AccountContext";
const { Option } = Select;

const InformationSection = (props) => {
  const { t } = useTranslation();
  const paymentId = props.paymentId;
  const setPaymentId = props.setPaymentId;

  const receiverPhone = props.receiverPhone;
  const setReceiverPhone = props.setReceiverPhone;

  const receiverName = props.receiverName;
  const setReceiverName = props.setReceiverName;

  const shippingAddressId = props.shippingAddressId;
  const handleChangeShippingAddress = props.handleChangeShippingAddress;

  const { shippingAddress } = useContext(AccountContext);

  const navigate = useNavigate();

  const handlePaymentChange = (e) => {
    setPaymentId(e.target.value);
  };

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  return (
    <div className="col-md-7 order-md-1 p-3">
      <div className="mb-5">
        <h4 className="mb-3 medium semi-thick">{t("informationSection.receiverInfo")}</h4>
        <div>
          <div className="label required">{t("informationSection.receiverName")}</div>
          <Input
            placeholder={t("informationSection.enterName")}
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            className="mb-3"
          />
          <div className="label required">{t("informationSection.receiverPhone")}</div>
          <Input
            placeholder={t("informationSection.enterPhone")}
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="mb-3 medium semi-thick">{t("informationSection.receiverAddress")}</h4>
        <div>
          <Select
            value={shippingAddressId}
            placeholder={t("informationSection.chooseAddress")}
            onChange={handleChangeShippingAddress}
            style={{
              width: "100%",
            }}
          >
            {shippingAddress.map((item) => (
              <Option value={item.id}>
                {`${item.address}, ${item.wardName}, ${item.districtName}, ${item.provinceName}`}
              </Option>
            ))}
          </Select>
          <div
            className="text-cyan mt-2"
            onClick={() => navigate("/account/shippingAddress")}
            style={{ textAlign: "end" }}
          >
            {t("informationSection.addNew")}
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="mb-3 medium semi-thick">{t("informationSection.paymentInfo")}</h4>
        <div>
          <Radio.Group onChange={handlePaymentChange} value={paymentId}>
            <Space direction="vertical">
              <Radio value={1}>{t("informationSection.paypal")}</Radio>
              <Radio value={2}>{t("informationSection.momo")}</Radio>
              <Radio value={3}>{t("informationSection.cod")}</Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
