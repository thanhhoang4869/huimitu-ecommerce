import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";

const CategoryBar = (props) => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  //map category children to menu item
  const getMenuSubItem = (children) => {
    return children.map((child) => {
      return getItem(child.categoryName, child.id, null, null, "sub");
    });
  };

  //map category list to menu item
  const getMenuItem = (categoryList) => {
    return categoryList.map((category) => {
      return getItem(
        category.categoryName,
        category.id,
        <AppstoreOutlined />,
        getMenuSubItem(category.children),
        "category"
      );
    });
  };

  const items = getMenuItem(props.categoryList);

  const onClick = (e) => {
    console.log("click ", e);
    console.log(props.categoryList);
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
      </div>
    </>
  );
};

export default CategoryBar;
