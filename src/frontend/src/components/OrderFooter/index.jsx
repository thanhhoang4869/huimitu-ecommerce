import React from "react";
import "./style.css";
import formatter from "utils/formatter";
import { Button } from "antd";
import config from "config/config";

const buttonStyle = {
  width: "192px",
  borderRadius: "5px",
};

const OrderFooter = (props) => {
  const { order, handleCancel, handleSuccess, handleReview } = props;

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
      {order.state === config.orderState.PENDING && (
        <Button
          size="large"
          style={{
            backgroundColor: "red",
            color: "white",
            ...buttonStyle,
          }}
          onClick={() => handleCancel(order.id)}
        >
          Hủy
        </Button>
      )}
      {order.state === config.orderState.SHIPPING && (
        <Button
          size="large"
          style={{
            ...buttonStyle,
          }}
          type="primary"
          onClick={() => handleSuccess(order.id)}
        >
          Đã nhận được hàng
        </Button>
      )}
      {order.state === config.orderState.SUCCESS && (
        <Button
          size="large"
          type="primary"
          style={{ ...buttonStyle }}
          onClick={() => handleReview(order.id)}
        >
          Đánh giá
        </Button>
      )}
    </div>
  );
};

export default OrderFooter;
