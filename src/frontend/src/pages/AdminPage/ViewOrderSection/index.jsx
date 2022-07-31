import { List } from "antd";
import config from "config/config";
import React, { useState, useEffect } from "react";
import orderService from "services/order";
import swal from "sweetalert2";
import AdminOrderItem from "../AdminOrderItem";

const ViewOrderSection = () => {
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const pageLimit = 3;

  const fetchOrderList = async () => {
    try {
      const response = await orderService.getOrderList({
        limit: pageLimit,
        offset: pageLimit * (page - 1),
        orderState: "pending",
      });
      const { orders, exitcode } = response.data;

      if (exitcode === 0) {
        setOrderList(orders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTotalItem = async () => {
    try {
      const response = await orderService.getTotalOrder({
        orderState: "pending",
      });
      const { exitcode, count } = response.data;
      if (exitcode === 0) {
        setTotalItem(count);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTotalItem();
  }, []);

  useEffect(() => {
    fetchOrderList();
  }, [page]);

  const handleCancel = async (orderId) => {
    try {
      const response = await orderService.updateState(
        orderId,
        config.orderState.CANCEL
      );
      const { exitcode, message } = response.data;
      if (exitcode === 0) {
        swal.fire({
          title: "Cập nhật trạng thái đơn hàng",
          text: "Hủy đơn thành công",
          icon: "info",
          confirmButtonText: "OK",
        });
        fetchOrderList();
      } else {
        swal.fire({
          title: "Cập nhật trạng thái đơn hàng thất bại",
          text: message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuccess = async (orderId) => {
    try {
      const response = await orderService.updateState(
        orderId,
        config.orderState.SHIPPING
      );

      const { exitcode, message } = response.data;
      if (exitcode === 0) {
        swal.fire({
          title: "Cập nhật trạng thái đơn hàng",
          text: "Xác nhận hàng đã giao cho bên vận chuyển",
          icon: "info",
          confirmButtonText: "OK",
        });
        fetchOrderList();
      } else {
        swal.fire({
          title: "Cập nhật trạng thái đơn hàng thất bại",
          text: message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "70vh",
      }}
      className="container"
    >
      <List
        className="mb-5"
        dataSource={orderList || []}
        pagination={{
          onChange: (page) => {
            setPage(page);
          },
          pageSize: pageLimit,
          total: totalItem,
        }}
        renderItem={(order) => (
          <AdminOrderItem
            order={order}
            handleCancel={handleCancel}
            handleSuccess={handleSuccess}
          />
        )}
      ></List>
    </div>
  );
};

export default ViewOrderSection;
