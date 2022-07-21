import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React from "react";
import formatter from "utils/formatter";

import "./style.css";

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
  {
    dataIndex: "edit",
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
          +formatter.formatPrice(variant.discountPrice) || "Không có",
        stock: variant.stock,
        edit: (
          <div
            className="text-key edit"
            style={{
              textAlign: "center",
            }}
          >
            <EditOutlined />
          </div>
        ),
      };
    })}
  />
);

export default VariantTable;
