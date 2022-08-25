import React, {useEffect} from "react";
import "./style.css";
import formatter from "utils/formatter";
import { Button, Col, Row } from "antd";
import config from "config/config";
import { useNavigate } from "react-router-dom";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const buttonStyle = {
  width: "192px",
  marginLeft: "5px",
  borderRadius: "5px",
};

const OrderFooter = (props) => {
  const { order, handleCancel, handleSuccess, handleRefund } = props;
  const navigator = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  return (
    <div className="order-footer">
      <p className="pt-3 order-shipping-price text-right">
        <Row>
          <Col>
            <div>{t("totalSection.shippingPrice")}</div>
            {+order.discountPrice !== 0 && <div>{t("totalSection.discount")}: </div>}
          </Col>
          <Col className="ml-2">
            <div className="color-key">
              {formatter.formatPrice(order.shippingPrice)}
            </div>

            {+order.discountPrice !== 0 && (
              <div className="color-key">
                -{formatter.formatPrice(order.discountPrice)}
              </div>
            )}
          </Col>
        </Row>
      </p>
      <p className="order-total">
        {t("totalSection.totalPrice")}:{" "}
        <span className="order-total-number color-key">
          {formatter.formatPrice(order.finalPrice)}
        </span>
      </p>
      <div>
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
            {t("totalSection.cancel")}
          </Button>
        )}
        {order.state === config.orderState.SHIPPING && (
          <>
            <Button
              size="large"
              style={{
                ...buttonStyle,
              }}
              type="primary"
              onClick={() => handleSuccess(order.id)}
            >
              {t("totalSection.received")}
            </Button>
            <Button
              size="large"
              style={{
                backgroundColor: "#F00",
                borderColor: "#F00",
                ...buttonStyle,
              }}
              type="primary"
              onClick={() => handleRefund(order.id)}
            >
              {t("totalSection.refund")}
            </Button>
          </>
        )}
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "#ff8303",
            borderColor: "#ff8303",
            ...buttonStyle,
          }}
          onClick={() => navigator(`/checkout?orderId=${order.id}`)}
        >
          {t("totalSection.rebuy")}
        </Button>
      </div>
    </div>
  );
};

export default OrderFooter;
