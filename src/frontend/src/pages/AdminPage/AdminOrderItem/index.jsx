import React from "react";
import ProductList from "components/ProductList";
import AdminOrderHeader from "./AdminOrderHeader";
import { Divider } from "antd";
import AdminOrderFooter from "./AdminOrderFooter";

const AdminOrderItem = (props) => {
  const { order, handleCancel, handleSuccess } = props;

  return (
    <div key={order.createdTime} className="my-3">
      <Divider orientation="left"></Divider>
      <AdminOrderHeader order={order} />
      <ProductList productList={order.variants} />
      <AdminOrderFooter
        order={order}
        handleCancel={handleCancel}
        handleSuccess={handleSuccess}
      />
    </div>
  );
}

export default AdminOrderItem