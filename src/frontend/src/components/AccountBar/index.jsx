import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const items = [
  { key: "userInformation", label: "Thông tin người dùng" },
  { key: "changePassword", label: "Đổi mật khẩu" },
];

const AccountBar = () => {
  let navigate = useNavigate();

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
          <span>Tùy chỉnh</span>
        </div>

        <Menu
          onClick={onClick}
          defaultSelectedKeys={["userInformation"]}
          style={{ border: "1px solid #e8e8e8" }}
          mode="inline"
          items={items}
        />
      </div>
    </>
  );
};

export default AccountBar;
