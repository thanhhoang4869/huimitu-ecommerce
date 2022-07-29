import { Col, Row } from "antd";
import config from "config/config";
import React from "react";
import "./style.css";

const AdminOrderHeader = (props) => {
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
          <Row>
            <Col span={12}>
              <p className="my-2">
                <b>Mã đơn hàng: </b>
                {order.id}
              </p>
              <p className="my-2">
                <b>Hình thức: </b>
                {order.paymentName === config.payment.PAYPAL && (
                  <span>Paypal</span>
                )}
                {order.paymentName === config.payment.MOMO && <span>Momo</span>}
                {order.paymentName === config.payment.COD && (
                  <span>Thanh toán khi nhận hàng</span>
                )}
              </p>
            </Col>
            <Col span={12}>
              <p className="my-2">
                <b>Tên người nhận: </b>
                {order.receiverName}
              </p>
              <p className="my-2">
                <b>Số điện thoại: </b>
                {order.receiverPhone}
              </p>
            </Col>
          </Row>
        </div>
      </div>
    );
}

export default AdminOrderHeader