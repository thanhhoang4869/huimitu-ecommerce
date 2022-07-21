import React from "react";
import "./style.css";
import formatter from "utils/formatter";

const OrderFooter = ({ order }) => {
  return (
    <div className="order-footer">
      <p className="order-shipping-price">
        Tiền vận chuyển:{" "}
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
      <button className="primary-btn" style={{ borderRadius: "5px" }}>
        Đánh giá
      </button>
    </div>
  );
};

export default OrderFooter;
