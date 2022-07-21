import React from "react";
import "./style.css";
import formatter from "utils/formatter";
import { Button } from "antd";

const buttonStyle = {
  width: "192px",
  borderRadius: "5px",
};

const OrderFooter = ({ order }) => {
  return (
    <div className="order-footer">
      <p className="pt-3 order-shipping-price">
        Phí vận chuyển:{" "}
        <span className="color-key">
          {formatter.formatPrice(order.shippingPrice)}
        </span>
      </p>
      <p className="order-total">
        Tổng tiền:{" "}
        <span className="order-total-number color-key">
          {formatter.formatPrice(order.finalPrice)}
        </span>
      </p>
      {order.state === "pending" && (
        <Button
          size="large"
          style={{
            backgroundColor: "red",
            color: "white",
            ...buttonStyle,
          }}
        >
          Hủy
        </Button>
      )}
      {order.state === "shipping" && (
        <Button
          size="large"
          style={{
            ...buttonStyle,
          }}
          type="primary"
        >
          Đã nhận được hàng
        </Button>
      )}
      {order.state === "success" && (
        <Button size="large" type="primary" style={{ ...buttonStyle }}>
          Đánh giá
        </Button>
      )}
    </div>
  );
};

export default OrderFooter;
