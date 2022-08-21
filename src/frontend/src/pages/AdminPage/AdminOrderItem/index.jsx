import React from "react";
import OrderVariantList from "components/ProductList";
import AdminOrderHeader from "./AdminOrderHeader";
import { Divider } from "antd";
import AdminOrderFooter from "./AdminOrderFooter";

const AdminOrderItem = (props) => {
  const { order, handleCancelOrder, handleAcceptOrder, handleConfirmRefund } =
    props;
  return (
    <div key={order.id} className="my-3">
      <Divider orientation="left"></Divider>
      <AdminOrderHeader order={order} />
      <OrderVariantList order={order} />
      <AdminOrderFooter
        order={order}
        handleCancelOrder={handleCancelOrder}
        handleAcceptOrder={handleAcceptOrder}
        handleConfirmRefund={handleConfirmRefund}
      />
    </div>
  );
};

export default AdminOrderItem;
