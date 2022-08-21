import { List } from "antd";
import config from "config/config";
import React, { useState, useEffect } from "react";
import orderService from "services/order";
import swal from "sweetalert2";
import AdminOrderItem from "../AdminOrderItem";
import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const ViewOrderSection = () => {
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const pageLimit = 3;
  const [searchParams] = useSearchParams();
  const orderState = searchParams.get("orderState");

  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const fetchOrderList = async () => {
    try {
      const response = await orderService.getOrderList({
        limit: pageLimit,
        offset: pageLimit * (page - 1),
        orderState: orderState,
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
        orderState: config.orderState.PENDING,
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
  }, [orderState]);

  useEffect(() => {
    fetchOrderList();
  }, [page, orderState]);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await orderService.updateState(
        orderId,
        config.orderState.CANCEL
      );
      const { exitcode, message } = response.data;
      if (exitcode === 0) {
        swal.fire({
          title: t("orderListPage.updateOrder"),
          text: t("orderListPage.cancelOrderSucess"),
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchOrderList();
      } else {
        swal.fire({
          title: t("viewOrderSection.updateOrderFail"),
          text: message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await orderService.updateState(
        orderId,
        config.orderState.SHIPPING
      );

      const { exitcode, message } = response.data;
      if (exitcode === 0) {
        swal.fire({
          title: t("orderListPage.updateOrder"),
          text: t("orderListPage.shippingProviderReceivedOrderConfirm"),
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchOrderList();
      } else {
        swal.fire({
          title: t("viewOrderSection.updateOrderFail"),
          text: message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmRefund = async (orderId) => {
    try {
      const response = await orderService.updateState(
        orderId,
        config.orderState.REFUNDED
      );
      const { exitcode, message } = response.data;
      if (exitcode === 0) {
        swal.fire({
          title: t("orderListPage.updateOrder"),
          text: t("orderListPage.confirmRefund"),
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchOrderList();
      } else {
        swal.fire({
          title: t("viewOrderSection.updateOrderFail"),
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
            handleCancelOrder={handleCancelOrder}
            handleAcceptOrder={handleAcceptOrder}
            handleConfirmRefund={handleConfirmRefund}
          />
        )}
      ></List>
    </div>
  );
};

export default ViewOrderSection;
