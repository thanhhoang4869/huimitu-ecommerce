import React from "react";
import ProductList from "components/ProductList";
import OrderHeader from "components/OrderHeader";
import OrderFooter from "components/OrderFooter";
import { Divider } from "antd";

const OrderItem = (props) => {
  const { order, handleCancel, handleSuccess, handleReview } = props;

  return (
    <div key={order.createdTime} className="my-3">
      <Divider orientation="left"></Divider>
      <OrderHeader order={order} />
      <ProductList productList={order.variants} />
      <OrderFooter
        order={order}
        handleCancel={handleCancel}
        handleSuccess={handleSuccess}
        handleReview={handleReview}
      />
    </div>
  );
};

export default OrderItem;
