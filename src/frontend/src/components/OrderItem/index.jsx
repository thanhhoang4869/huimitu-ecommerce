import React from "react";
import ProductList from "components/ProductList";
import OrderHeader from "components/OrderHeader";
import OrderFooter from "components/OrderFooter";
import { Divider } from "antd";

const OrderItem = (props) => {
  const order = props.order;
  console.log(order)
  return (
    <div key={order.createdTime} className="my-3">
      <Divider orientation="left"></Divider>
      <OrderHeader order={order} />
      <ProductList productList={order.variants} />
      <OrderFooter order={order}/>
    </div>
  );
};

export default OrderItem;
