import React from "react";
import ProductList from "components/ProductList";
import OrderHeader from "components/OrderHeader";
import OrderFooter from "components/OrderFooter";
import { Divider } from "antd";

const OrderItem = ({order}) => {
  return (
    <div key={order.id} className="my-3">
      <Divider orientation="left" orientationMargin="0">{order.id}</Divider>
      <OrderHeader order={order} />
      <ProductList productList={order.product_list} />
      <OrderFooter order={order}/>
    </div>
  );
};

export default OrderItem;
