import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert2";

import product from "services/product";
import formatter from "utils/formatter";
import "./style.css";

const swalDeleteProps = {
  title: "Bạn chắc chắn muốn xóa sản phẩm này?",
  text: "Sản phẩm đã xóa sẽ không thể khôi phục!",
  icon: "warning",
  showCancelButton: true,
  cancelButtonText: "Hủy",
  confirmButtonText: "Xóa",
  customClass: {
    cancelButton: "order-1",
    confirmButton: "order-2",
  },
};

const ViewProductSection = () => {
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
  };

  const onDeleteProduct = async (id) => {
    try {
      const result = await swal.fire(swalDeleteProps);
      if (result.isConfirmed) {
        swal.fire("Đã xóa sản phẩm", "", "success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

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
      title: "Name",
      dataIndex: "productName",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => +a.minPrice - +b.minPrice,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: (a, b) => +a.stock - +b.stock,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      width: "20%",
      filters: [
        {
          text: "Túi và đầu chiết",
          value: "Túi và đầu chiết",
        },
        {
          text: "Giấy nến",
          value: "Giay nen",
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
      onFilter: (value, record) => record.categoryName.indexOf(value) === 0,
    },
    {
      dataIndex: "action",
    },
  ];

  const data = products.map((product) => {
    return {
      image: (
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/71tvKFymISL.jpg"
          alt="img"
        />
      ),
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
        <div className="del" onClick={onDeleteProduct}>
          <DeleteOutlined />
        </div>
      ),
    };
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <Table
        pagination={{
          pageSize: 5,
          showTotal: (total) => `${total} sản phẩm`,
        }}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </>
  );
};

export default ViewProductSection;
