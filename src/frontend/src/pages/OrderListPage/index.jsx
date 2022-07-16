import { List, Table } from "antd";
import OrderItem from "components/OrderItem";
import React from "react";

const columns = [
  {
    title: "Order detail",
    dataIndex: "order",
    key: "order",
    render: (order) => <OrderItem order={order} />,
  },
];

const data = [
  {
    variant_id: "1",
    productName: "Túi trang trí (10 cái) có thể tái sử dụng (10 cái)",
    price: 20000,
  },
  {
    variant_id: "2",
    productName: "Đầu chiết Open Star",
    price: 400000,
  },
  {
    variant_id: "3",
    productName: "Đầu chiết hình bông hoa",
    price: 20000,
  },
];

const orderList = [
  {
    product_list: data,
    id: "00001",
    created_time: "03/12/2001",
    total: 400000,
  },
  {
    product_list: data,
    id: "00002",
    created_time: "01/12/2001",
    total: 400000,
  },
];

const OrderListPage = () => {
  return (
    <div className="container">
      <List
        className="mb-5"
        dataSource={orderList}
        pagination={{
          //TODO: Implement this
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        renderItem={(order) => <OrderItem order={order}/>}
      ></List>
    </div>
  );
};

export default OrderListPage;
