import React from "react";
import OrderVariantList from "components/ProductList";
import OrderHeader from "components/OrderHeader";
import OrderFooter from "components/OrderFooter";
import { Divider } from "antd";

const OrderItem = (props) => {
  const { order, handleCancel, handleSuccess, handleReview } = props;

  return (
    <div key={order.id} className="my-3">
      <Divider orientation="left"></Divider>
      <OrderHeader order={order} />
      <OrderVariantList order={order} handleReview={handleReview} />
      <OrderFooter
        order={order}  
        handleCancel={handleCancel}
        handleSuccess={handleSuccess}
      />
    </div>
  );
};

export default OrderItem;
