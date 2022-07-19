import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Radio, Space, Select } from "antd";

import "./style.css";
const { Option } = Select;

const InformationSection = (props) => {
  const paymentId = props.paymentId;
  const setPaymentId = props.setPaymentId;

  const receiverPhone = props.receiverPhone;
  const setReceiverPhone = props.setReceiverPhone;

  const receiverName = props.receiverName;
  const setReceiverName = props.setReceiverName;

  const navigate = useNavigate();

  const handlePaymentChange = (e) => {
    setPaymentId(e.target.value);
  };

  return (
    <div className="col-md-7 order-md-1 p-3">
      <div className="mb-5">
        <h4 className="mb-3 medium semi-thick">Thông tin người nhận</h4>
        <div>
          <div className="label required">Tên người nhận</div>
          <Input
            placeholder="Nhập tên người nhận"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            className="mb-3"
          />
          <div className="label required">SĐT người nhận</div>
          <Input
            placeholder="SĐT người nhận"
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="mb-3 medium semi-thick">Địa chỉ giao hàng</h4>
        <div>
          <Select
            defaultValue="1"
            style={{
              width: "100%",
            }}
          >
            <Option value="1">
              44 Võ Oanh, Phường 25, Quận Bình Thạnh, TP. HCM
            </Option>
          </Select>
          <div
            className="text-cyan mt-2"
            onClick={() => navigate("/account/shippingAddress")}
            style={{ textAlign: "end" }}
          >
            Thêm mới
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="mb-3 medium semi-thick">Thông tin thanh toán</h4>
        <div>
          <Radio.Group onChange={handlePaymentChange} value={paymentId}>
            <Space direction="vertical">
              <Radio value={1}>Thanh toán Momo</Radio>
              <Radio value={2}>Thanh toán Paypal</Radio>
              <Radio value={3}>Thanh toán khi nhận hàng</Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
