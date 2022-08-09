import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import checkoutService from "services/checkout";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyPaypalButton = (props) => {
  const shippingAddressId = props.shippingAddressId;
  const receiverName = props.receiverName;
  const receiverPhone = props.receiverPhone;
  const voucherCode = props.voucherCode;
  const handleCheckout = props.handleCheckout;
  const navigator = useNavigate();

  const createOrder = async (data, actions) => {
    const orderId = await handleCheckout();
    if (orderId) {
      return orderId;
    }
    return null;
  };

  const notifyPaypal = async (data, actions) => {
    try {
      // Notify for server
      const response = await checkoutService.notifyPaypal(data.orderID);

      const { exitcode } = response.data;
      if (exitcode === 0) {
        swal.fire({
          title: "Thanh toán",
          text: `Bạn đã thanh toán thành công cho đơn ${data.orderID}`,
          icon: "info",
          confirmButtonText: "OK",
        });
      } else {
        swal.fire({
          title: "Thanh toán",
          text: `Thanh toán thất bại cho đơn ${data.orderID}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      navigator("/account/order");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div>
      <PayPalButtons
        createOrder={createOrder}
        forceReRender={[shippingAddressId, receiverName, receiverPhone, voucherCode]}
        onApprove={notifyPaypal}
        onCancel={notifyPaypal}
        style={{ layout: "horizontal", tagline: false }}
      />
    </div>
  );
};

export default MyPaypalButton;
