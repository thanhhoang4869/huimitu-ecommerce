import { List, Table } from "antd";
import OrderItem from "components/OrderItem";
import React, { useState, useEffect } from "react";
import account from "services/account";

const OrderListPage = () => {
  const [error, setError] = useState("");
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await account.getOrderList();
        const { orders } = response.data;
        setOrderList(orders);
      } catch (error) {
        setError(error.message);
      }
    };
    getData();
  }, []);

  return (
    <div
      style={{
        minHeight: "70vh",
      }}
      className="container"
    >
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
        renderItem={(order) => <OrderItem order={order} />}
      ></List>
    </div>
  );
};

export default OrderListPage;
