import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert2";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

import product from "services/product";
import formatter from "utils/formatter";
import "./style.css";

const ViewProductSection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const location = useLocation();
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const countResponse = await product.countProducts();

    const request = {
      limit: countResponse.data.count,
      offset: 0,
    };
    const res = await product.getProducts(request);
    setProducts(res.data.products);
    console.log(products);
  };

  const onDeleteProduct = async (id) => {
    try {
      const result = await swal.fire(swalDeleteProps);
      if (result.isConfirmed) {
        swal.fire(t("viewProductSection.deleted"), "", "success");
        product.deleteProduct(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const swalDeleteProps = {
    title: t("viewProductSection.sureDelete"),
    text: t("viewProductSection.warningDelete"),
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: t("viewProductSection.cancelDelete"),
    confirmButtonText: t("viewProductSection.confirmDelete"),
    customClass: {
      cancelButton: "order-1",
      confirmButton: "order-2",
    },
  };

  const columns = [
    {
      dataIndex: "image",
      width: "10%",
    },
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      sorter: (a, b) => +a.id - +b.id,
      sortDirections: ["descend"],
    },
    {
      title: t("cartPage.productName"),
      dataIndex: "productName",
    },
    {
      title: t("cartPage.price"),
      dataIndex: "price",
      width: "20%",
      sorter: (a, b) => +a.minPrice - +b.minPrice,
    },
    {
      title: t("cartPage.quantity"),
      dataIndex: "stock",
      sorter: (a, b) => +a.stock - +b.stock,
    },
    {
      title: t("cartPage.category"),
      dataIndex: "categoryName",
      width: "20%",
      filters: [
        {
          text: "Túi và đầu chiết",
          value: "Túi và đầu chiết",
        },
        {
          text: "Giấy nến",
          value: "Giấy nến",
        },
        {
          text: "Dụng cụ trang trí bánh kem",
          value: "Dụng cụ trang trí bánh kem",
        },
        {
          text: "Khuôn bánh",
          value: "Khuôn bánh",
        },
        {
          text: "Dụng cụ trang trí bánh quy",
          value: "Dụng cụ trang trí bánh quy",
        },
        {
          text: "Khay nướng",
          value: "Khay nướng",
        },
        {
          text: "Khuôn bánh muffin",
          value: "Khuôn bánh muffin",
        },
        {
          text: "Khuôn tạo hình",
          value: "Khuôn tạo hình",
        },
      ],
      onFilter: (value, record) => record.categoryName === value,
    },
    {
      dataIndex: "action",
    },
  ];

  const data = products.map((product) => {
    return {
      image: <img src={product?.image} alt="img" />,
      key: product.id,
      id: product.id,
      productName: (
        <Link to={`/admin/editProduct/${product.id}`} className="text-key">
          {product.productName}
        </Link>
      ),
      price:
        formatter.formatPrice(product.minPrice) +
        " - " +
        formatter.formatPrice(product.maxPrice),
      minPrice: product.minPrice,
      maxPrice: product.maxPrice,
      stock: product.stock,
      categoryName: product.categoryName,
      action: (
        <div className="del" onClick={() => onDeleteProduct(product.id)}>
          <DeleteOutlined />
        </div>
      ),
    };
  });

  return (
    <>
      <Table
        pagination={{
          pageSize: 5,
          showTotal: (total) => `${total} ${t("cartPage.product", {count: total})}`,
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default ViewProductSection;
