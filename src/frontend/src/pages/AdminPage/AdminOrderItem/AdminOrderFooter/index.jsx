import React, { useEffect } from "react";
import "./style.css";
import formatter from "utils/formatter";
import { Button, Col, Row } from "antd";
import config from "config/config";
import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const buttonStyle = {
  width: "192px",
  marginLeft: "5px",
  borderRadius: "5px",
};

const AdminOrderFooter = (props) => {
  const { order, handleAcceptOrder, handleCancelOrder, handleConfirmRefund } =
    props;
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  return (
    <div className="order-footer">
      <p className="pt-3 order-shipping-price text-right">
        <Row>
          <Col>
            <div>{t("totalSection.shippingPrice")}:</div>
            {+order.discountPrice !== 0 && <div>Giảm giá: </div>}
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
          <>
            <Button
              size="large"
              style={{
                backgroundColor: "red",
                color: "white",
                ...buttonStyle,
              }}
              onClick={() => handleCancelOrder(order.id)}
            >
              {t("totalSection.cancel")}
            </Button>
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              onClick={() => handleAcceptOrder(order.id)}
            >
              {t("totalSection.confirm")}
            </Button>
          </>
        )}
        {order.state === config.orderState.REFUNDING && (
          <>
            <Button
              size="large"
              style={buttonStyle}
              type="primary"
              onClick={() => handleConfirmRefund(order.id)}
            >
              {t("totalSection.confirmRefund")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrderFooter;
