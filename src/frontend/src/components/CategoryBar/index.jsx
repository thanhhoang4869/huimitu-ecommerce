import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryBar = (props) => {
  let navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
    navigate({
      pathname: `/product`,
      search: `?categoryId=${e.key}&page=1`,
    });
  };

  const onOpenChange = (e) => {
    const key = e[1] ? e[1] : openKey;
    setOpenKey(key)
    setCurrent(key);
    navigate({
      pathname: `/product`,
      search: `?categoryId=${key}&page=1`,
    });
  };

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
      return getItem(child.categoryName, child.id, null, null);
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
      );
    });
  };

  const items = getMenuItem(props.categoryList);


  const [current, setCurrent] = useState("1");
  const [openKey, setOpenKey] = useState("1");

  return (
    <>
      <div className="col-lg-3">
        <div className="hero__categories__all">
          <i className="fa fa-bars"></i>
          <span>Danh mục</span>
        </div>

        <Menu
          onOpenChange={onOpenChange}
          onClick={onClick}
          openKeys={[openKey]}
          style={{ border: "1px solid #e8e8e8" }}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </div>
    </>
  );
};

export default CategoryBar;
