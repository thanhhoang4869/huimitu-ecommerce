import { List } from "antd";
import OrderItem from "components/OrderItem";
import config from "config/config";
import { AccountContext } from "context/AccountContext";
import React, { useState, useEffect, useContext } from "react";
import orderService from "services/order";
import reviewService from "services/review";
import swal from "sweetalert2";

const OrderListPage = () => {
  const { account } = useContext(AccountContext);
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const pageLimit = 3;

  const fetchOrderList = async () => {
    try {
      const response = await orderService.getOrderList({
        limit: pageLimit,
        offset: pageLimit * (page - 1),
        email: account.email,
      });
      const { orders } = response.data;
      setOrderList(orders);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTotalItem = async () => {
    try {
      const response = await orderService.getTotalOrder({
        email: account.email,
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
  }, [account]);

  useEffect(() => {
    fetchOrderList();
  }, [page, account]);

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

  const handleReview = async (orderId, variantId, rating, comment) => {
    try {
      const response = await reviewService.createReview({
        orderId,
        variantId,
        rating,
        comment,
      });
      const { exitcode } = response;
      if (exitcode === 0) {
        swal.fire({
          title: "Đánh giá sản phẩm",
          text: "Đánh giá sản phẩm thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchOrderList();
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
        dataSource={orderList}
        pagination={{
          onChange: (page) => {
            setPage(page);
          },
          pageSize: pageLimit,
          total: totalItem,
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
