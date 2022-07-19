import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table } from "antd";
import Paging from "components/Paging";
import product from "services/product";
import formatter from "utils/formatter";

const ViewProductSection = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [countProducts, setCountProducts] = useState(0);

  const getCountProducts = async () => {
    const res = await product.countProducts();
    setCountProducts(res.data.count);
    console.log(res.data.count);
  };

  const getAllProducts = async () => {
    const request = {
      page,
      limit: 6,
      offset: +(page - 1) * 6,
    };
    const res = await product.getProducts(request);
    console.log(res.data.products);
    setProducts(res.data.products);
  };

  useEffect(() => {
    getCountProducts();
    getAllProducts();
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      title: "Number",
      dataIndex: "id",
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
  ];

  const data = products.map((product) => {
    return {
      key: product.id,
      id: product.id,
      productName: (
        <Link to="#" className="text-key">
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
    };
  });

  const onChange = (filters, sorter, extra) => {
    console.log("params", filters, sorter, extra);
  };

  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />

      <div className="mt-3" style={{ textAlign: "end" }}>
        <Paging total={countProducts} page={page} current={page} />
      </div>
    </>
  );
};

export default ViewProductSection;
