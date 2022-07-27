import { List, Table } from "antd";
import OrderItem from "components/OrderItem";
import config from "config/config";
import React, { useState, useEffect } from "react";
import account from "services/account";
import orderService from "services/order";
import swal from "sweetalert2";

const OrderListPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const pageLimit = 3;

  const fetchOrderList = async () => {
    try {
      const response = await account.getOrderList(
        pageLimit,
        pageLimit * (page - 1)
      );
      const { orders } = response.data;
      setOrderList(orders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, [page]);

  const handleCancel = async (orderId) => {
    try {
      const response = await orderService.updateState(
        orderId,
        config.orderState.CANCEL
      );
      const { exitcode } = response.data;
      if (exitcode === 0) {
        swal.fire({
          title: "Cập nhật trạng thái đơn hàng",
          text: "Hủy đơn thành công",
          icon: "info",
          confirmButtonText: "OK",
        });
        fetchOrderList();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuccess = async (orderId) => {
    try {
      const response = await orderService.updateState(
        orderId,
        config.orderState.SUCCESS
      );
      const { exitcode } = response.data;
      if (exitcode === 0) {
        swal.fire({
          title: "Cập nhật trạng thái đơn hàng",
          text: "Xác nhận đã nhận hàng thành công",
          icon: "info",
          confirmButtonText: "OK",
        });
        fetchOrderList();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReview = () => {};

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
          onChange: (page) => {
            setPage(page);
          },
          pageSize: pageLimit,
        }}
        renderItem={(order) => (
          <OrderItem
            order={order}
            handleCancel={handleCancel}
            handleSuccess={handleSuccess}
            handleReview={handleReview}
          />
        )}
      ></List>
    </div>
  );
};

export default OrderListPage;
