import { Menu } from "antd";
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";


import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const items_vi = [
  { key: "userInformation", label: "Thông tin người dùng" },
  { key: "changeInformation", label: "Đổi thông tin" },
  { key: "shippingAddress", label: "Địa chỉ giao hàng" },
  { key: "cart", label: "Giỏ hàng" },
  { key: "order", label: "Đơn hàng" },
];

const items_en = [
  { key: "userInformation", label: "User information" },
  { key: "changeInformation", label: "Change information" },
  { key: "shippingAddress", label: "Shipping address" },
  { key: "cart", label: "Cart" },
  { key: "order", label: "Order" },
];

const AccountBar = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const onClick = (e) => {
    navigate({
      pathname: `/account/${e.key}`,
    });
  };

  return (
    <>
      <div className="col-lg-3">
        <div className="hero__categories__all">
          <i className="fa fa-bars"></i>
          <span>{t("accountBar.customize")}</span>
        </div>

        <Menu
          onClick={onClick}
          defaultSelectedKeys={["userInformation"]}
          style={{ border: "1px solid #e8e8e8" }}
          mode="inline"
          items={items_vi}
        />
      </div>
    </>
  );
};

export default AccountBar;
