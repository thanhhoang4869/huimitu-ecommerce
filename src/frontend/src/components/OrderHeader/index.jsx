import React from "react";
import "./style.css";

const OrderHeader = (props) => {
  const order = props.order;
  return (
    <div className="order-header">
      <p className="order-date-created">{order.createdTime}</p>
      <p className="order-status">
        {order.state === "pending" && (
          <div
            style={{
              color: "#EBA134",
            }}
          >
            Chờ duyệt
          </div>
        )}
        {order.state === "shipping" && (
          <div
            style={{
              color: "#3464EB",
            }}
          >
            Đang vận chuyển
          </div>
        )}
        {order.state === "success" && (
          <div
            style={{
              color: "#2BC24B",
            }}
          >
            Hoàn thành
          </div>
        )}
        {order.state === "cancel" && (
          <div
            style={{
              color: "#F00",
            }}
          >
            Đã hủy
          </div>
        )}
      </p>
      <div>
        <p className="my-2">
          <b>Mã đơn hàng: </b>
          {order.id}
        </p>
        <p className="my-2">
          <b>Tên người nhận: </b>
          {order.receiverName}
        </p>
        <p className="my-2">
          <b>Sđt: </b>
          {order.receiverPhone}
        </p>
      </div>
    </div>
  );
};

export default OrderHeader;
