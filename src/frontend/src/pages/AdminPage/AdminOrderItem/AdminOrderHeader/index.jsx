import { Col, ConfigProvider, Row } from "antd";
import config from "config/config";
import React, { useEffect } from "react";
import "./style.css";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const AdminOrderHeader = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

    const order = props.order;
    return (
      <div className="order-header">
        <p className="order-date-created">{order.createdTime}</p>
        <p className="order-status">
          {order.state === config.orderState.PENDING && (
            <div
              style={{
                color: "#EBA134",
              }}
            >
              {t("orderHeader.pending")}
            </div>
          )}
          {order.state === config.orderState.SHIPPING && (
            <div
              style={{
                color: "#3464EB",
              }}
            >
              {t("orderHeader.shipping")}
            </div>
          )}
          {order.state === config.orderState.SUCCESS && (
            <div
              style={{
                color: "#2BC24B",
              }}
            >
              {t("orderHeader.success")}
            </div>
          )}
          {order.state === config.orderState.CANCEL && (
            <div
              style={{
                color: "#F00",
              }}
            >
              {t("orderHeader.cancel")}
            </div>
          )}
          {order.state === config.orderState.REFUND && (
            <div
              style={{
                color: "#F00",
              }}
            >
              {t("orderHeader.refund")}
            </div>
          )}
        </p>
        <div>
          <Row>
            <Col span={12}>
              <p className="my-2">
                <b>{t("orderHeader.id")}: </b>
                {order.id}
              </p>
              <p className="my-2">
                <b>{t("orderHeader.paymentMethod")}: </b>
                {order.paymentName === config.payment.PAYPAL && (
                  <span>Paypal</span>
                )}
                {order.paymentName === config.payment.MOMO && <span>Momo</span>}
                {order.paymentName === config.payment.COD && (
                  <span>{t("informationSection.cod")}</span>
                )}
              </p>
            </Col>
            <Col span={12}>
              <p className="my-2">
                <b>{t("informationSection.receiverName")}: </b>
                {order.receiverName}
              </p>
              <p className="my-2">
                <b>{t("informationSection.receiverPhone")}: </b>
                {order.receiverPhone}
              </p>
            </Col>
          </Row>
        </div>
      </div>
    );
}

export default AdminOrderHeader