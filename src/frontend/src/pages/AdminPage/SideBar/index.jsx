import {
  PercentageOutlined,
  ShopOutlined,
  BookOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";
import config from "config/config";

const SideBar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem(t("sideBar.statistic"), "statistic", <LineChartOutlined />),
    getItem(t("sideBar.product"), "prod", <ShopOutlined />, [
      getItem(t("sideBar.viewProduct"), "viewProduct"),
      getItem(t("sideBar.addProduct"), "addProduct"),
    ]),
    getItem(t("sideBar.voucher"), "voucher", <PercentageOutlined />, [
      getItem(t("sideBar.viewVoucher"), "viewVoucher"),
      getItem(t("sideBar.addVoucher"), "addVoucher"),
    ]),
    getItem(t("sideBar.order"), "order", <BookOutlined />, [
      getItem(t("sideBar.pendingOrder"), config.orderState.PENDING),
      getItem(t("sideBar.successOrder"), config.orderState.SUCCESS),
      getItem(t("sideBar.shippingOrder"), config.orderState.SHIPPING),
      getItem(t("sideBar.cancelledOrder"), config.orderState.CANCEL),
      getItem(t("sideBar.refundingOrder"), config.orderState.REFUNDING),
      getItem(t("sideBar.refundedOrder"), config.orderState.REFUNDED),
    ]),
  ];

  const rootSubmenuKeys = ["prod", "voucher"];

  const [openKeys, setOpenKeys] = useState(["statistic"]);
  const [current, setCurrent] = useState("statistic");

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <>
      <div className="col-lg-3">
        <div className="hero__categories__all">
          <i className="fa fa-bars"></i>
          <span>{t("sideBar.admin")}</span>
        </div>

        <Menu
          mode="inline"
          style={{ border: "1px solid #e8e8e8" }}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          items={items}
          onClick={(e) => {
            setCurrent(e.key);
            if (Object.keys(config.orderState).includes(e.key.toUpperCase())) {
              navigate(`/admin/viewOrder?orderState=${e.key}`);
            } else {
              navigate(`/admin/${e.key}`);
            }
          }}
        />
      </div>
    </>
  );
};

export default SideBar;
