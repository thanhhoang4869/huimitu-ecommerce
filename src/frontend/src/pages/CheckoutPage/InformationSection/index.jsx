import React from "react";
import { Input } from "antd";
import ShippingInformationForm from "../ShippingInformationForm";

const InformationSection = () => {
  return (
    <div className="col-md-7 order-md-1 p-3">
      <div className="mb-5">
        <h4 className="mb-3 medium semi-thick">Thông tin người nhận</h4>
        <div>
          <Input
            placeholder="Tên người nhận"
            value={"Thanh"}
            className="mb-3"
          />
          <Input placeholder="SĐT người nhận" value={"0933432607"} />
        </div>
      </div>

      <div className="mb-5">
        <h4 className="mb-3  medium semi-thick">Địa chỉ giao hàng</h4>
        <div>
          <ShippingInformationForm />
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
