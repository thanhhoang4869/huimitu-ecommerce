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
  },
  {
    title: "Giá giảm",
    dataIndex: "discountPrice",
  },
  {
    title: "Số lượng",
    dataIndex: "stock",
  },
  {
    dataIndex: "edit",
  },
];

const onChange = (filters, sorter, extra) => {
  console.log("params", filters, sorter, extra);
};

const VariantTable = (props) => {
  const variants = props.variants;
  const handleEdit = props.handleEdit;

  return (
    <Table
      pagination={false}
      columns={columns}
      onChange={onChange}
      dataSource={variants.map((variant, index) => {
        return {
          key: variant?.id ?? index,
          name: variant.variantName,
          price: formatter.formatPrice(+variant.price),
          discountPrice:
            typeof variant.discountPrice !== "undefined"
              ? formatter.formatPrice(+variant.discountPrice)
              : "Không có",
          stock: +variant.stock,
          edit: (
            <div
              className="text-key edit"
              style={{
                textAlign: "center",
              }}
              onClick={() => handleEdit(variant)}
            >
              <EditOutlined />
            </div>
          ),
        };
      })}
    />
  );
};

export default VariantTable;
