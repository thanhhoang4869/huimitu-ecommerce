import { PercentageOutlined, ShopOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = (props) => {
  const navigate = useNavigate();

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
    getItem("Sản phẩm", "prod", <ShopOutlined />, [
      getItem("Xem và chỉnh sửa", "view_prod"),
      getItem("Thêm sản phẩm", "edit_prod"),
    ]),
    getItem("Voucher", "voucher", <PercentageOutlined />, [
      getItem("Xem và chỉnh sửa", "view_voucher"),
      getItem("Thêm voucher", "edit_voucher"),
    ]),
  ];

  const rootSubmenuKeys = ["prod", "voucher"];

  const [openKeys, setOpenKeys] = useState(["prod"]);

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
          <span>Quản lý</span>
        </div>

        <Menu
          mode="inline"
          style={{ border: "1px solid #e8e8e8" }}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={items}
        />
      </div>
    </>
  );
};

export default SideBar;
