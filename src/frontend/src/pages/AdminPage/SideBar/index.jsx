import { PercentageOutlined, ShopOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
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
      getItem("Xem và chỉnh sửa", "viewProduct"),
      getItem("Thêm sản phẩm", "addProduct"),
    ]),
    getItem("Voucher", "voucher", <PercentageOutlined />, [
      getItem("Xem và chỉnh sửa", "viewVoucher"),
      getItem("Thêm voucher", "addVoucher"),
    ]),
  ];

  const rootSubmenuKeys = ["prod", "voucher"];

  const [openKeys, setOpenKeys] = useState(["prod"]);
  const [current, setCurrent] = useState("viewProduct");

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
          selectedKeys={[current]}
          items={items}
          onClick={(e) => {
            setCurrent(e.key);
            navigate(`/admin/${e.key}`);
          }}
        />
      </div>
    </>
  );
};

export default SideBar;
