import { List } from "antd";
import OrderItem from "components/OrderItem";
import config from "config/config";
import { AccountContext } from "context/AccountContext";
import React, { useState, useEffect, useContext } from "react";
import orderService from "services/order";
import reviewService from "services/review";
import swal from "sweetalert2";
import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const OrderListPage = () => {
  const { account } = useContext(AccountContext);
  const [orderList, setOrderList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const pageLimit = 3;
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

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
          title: t("orderListPage.updateOrder"),
          text: t("orderListPage.cancelOrderSucess"),
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
          title: t("orderListPage.updateOrder"),
          text: t("orderListPage.receivedOrderSucess"),
          icon: "info",
          confirmButtonText: "OK",
        });
        fetchOrderList();
      } else {
        swal.fire({
          title: t("orderListPage.failTitle"),
          text: t("orderListPage.fail"),
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReview = async ({ orderId, variantId, rating, comment }) => {
    try {
      const response = await reviewService.createReview({
        orderId,
        variantId,
        rating,
        comment,
      });
      const { exitcode, message } = response.data;
      if (exitcode === 0) {
        swal.fire({
          title: t("orderListPage.rate"),
          text: t("orderListPage.rateSuccess"),
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchOrderList();
      } else {
        swal.fire({
          title: t("orderListPage.failTitle"),
          text: t("orderListPage.fail"),
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefund = async (orderId) => {
    try {
      const result = await swal.fire({
        title: t("orderListPage.updateOrder"),
        text: t("orderListPage.refundConfirm"),
        icon: "info",
        showCancelButton: true,
        cancelButtonText: t("orderListPage.cancel"),
        confirmButtonText: "OK",
        customClass: {
          cancelButton: "order-1",
          confirmButton: "order-2",
        },
      });

      if (result.isConfirmed) {
        try {
          const response = await orderService.updateState(
            orderId,
            config.orderState.REFUND
          );
          const { exitcode } = response.data;
          if (exitcode === 0) {
            swal.fire({
              title: t("orderListPage.updateOrder"),
              text: t("orderListPage.refundSuccess"),
              icon: "info",
              confirmButtonText: "OK",
            });
            fetchOrderList();
          } else {
            swal.fire({
              title: t("orderListPage.failTitle"),
              text: t("orderListPage.fail"),
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        } catch (err) {
          console.error(err);
        }
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
          onChange: setPage,
          pageSize: pageLimit,
          total: totalItem,
        }}
        renderItem={(order) => (
          <OrderItem
            order={order}
            handleCancel={handleCancel}
            handleSuccess={handleSuccess}
            handleReview={handleReview}
            handleRefund={handleRefund}
          />
        )}
      ></List>
    </div>
  );
};

export default OrderListPage;
