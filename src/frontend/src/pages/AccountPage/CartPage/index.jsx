import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import formatter from "utils/formatter";
import cartService from "services/cart";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Tên sản phẩm",
    dataIndex: "variantName",
    key: "variantName",
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Trạng thái",
    dataIndex: "available",
    key: "available",
  },
];

const CartPage = () => {
  const [cart, setCart] = useState({});
  const [variants, setVariants] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await cartService.getCart();
      const { cart, variants } = response.data;
      setCart(cart)
      setVariants(variants)
    } catch (err) {}
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <p className="my-2">
            <b>Tổng số lượng: </b>
            {formatter.formatPrice(cart.count)} sản phẩm
          </p>
          <p className="my-2">
            <b>Tổng thành tiền: </b>
            {formatter.formatPrice(cart.total)} VND
          </p>
        </div>
        <Button type="primary" size="large">
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
