import { Table } from "antd";
import React from "react";
import formatter from "utils/formatter";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Giá",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Giá giảm",
    dataIndex: "discountPrice",
  },
  {
    title: "Số lượng",
    dataIndex: "stock",
    sorter: (a, b) => a.price - b.price,
  },
];

const onChange = (filters, sorter, extra) => {
  console.log("params", filters, sorter, extra);
};

const VariantTable = ({ variants }) => (
  <Table
    pagination={false}
    columns={columns}
    onChange={onChange}
    dataSource={variants.map((variant) => {
      return {
        key: variant.id,
        name: variant.variantName,
        price: formatter.formatPrice(variant.price),
        discountPrice:
          formatter.formatPrice(variant.discountPrice) || "Không có",
        stock: variant.stock,
      };
    })}
  />
);

export default VariantTable;
