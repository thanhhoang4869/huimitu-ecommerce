import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";

const CategoryBar = () => {
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
    getItem("Navigation One", "sub1", <MailOutlined />, [
      getItem("Option 1", "1"),
      getItem("Option 2", "2"),
      getItem("Option 3", "3"),
      getItem("Option 4", "4"),
    ]),
    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Submenu", "sub3", null, [
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
      ]),
    ]),
    getItem("Navigation Three", "sub4", <SettingOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const [current, setCurrent] = useState("1");

  return (
    <>
      <div className="col-lg-3">
        <div className="hero__categories__all">
          <i className="fa fa-bars"></i>
          <span>Danh mục</span>
        </div>
        <Menu
          style={{ border: "1px solid #e8e8e8" }}
          onClick={onClick}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
        {/* <div className="hero__categories">
          <div className="hero__categories__all">
            <i className="fa fa-bars"></i>
            <span>Danh mục</span>
          </div>
          <ul>
            <li>
              <a href="#">Khuôn bánh</a>
            </li>
            <li>
              <a href="#">Giấy nến</a>
            </li>
            <li>
              <a href="#">Que trát kem</a>
            </li>
            <li>
              <a href="#">Dao răng cưa</a>
            </li>
            <li>
              <a href="#">Dụng cụ phết trang trí</a>
            </li>
            <li>
              <a href="#">Đầu chiết</a>
            </li>
            <li>
              <a href="#">Dụng cụ bắt kem</a>
            </li>
            <li>
              <a href="#">Tượng trang trí</a>
            </li>
            <li>
              <a href="#">Que cắm trang trí</a>
            </li>
            <li>
              <a href="#">Topper mica</a>
            </li>
            <li>
              <a href="#">Cốm trang trí</a>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default CategoryBar;
