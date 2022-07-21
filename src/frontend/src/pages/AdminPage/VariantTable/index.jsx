import { Table } from "antd";
import React from "react";
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
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const VariantTable = () => (
  <Table
    pagination={false}
    columns={columns}
    dataSource={data}
    onChange={onChange}
  />
);

export default VariantTable;
