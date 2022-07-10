import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import checkout from "services/checkout";

const PaypalButton = (props) => {
  const variantId = 1;
  const quantity = 3;
  const paymentId = 1;
  const shippingAddressId = 1;
  const shippingProviderId = 1;
  const voucherCode = undefined;

  const createOrder = async (data, actions) => {
    // Get order ID from server
    const response = await checkout.checkoutBuyNow({
      variantId,
      quantity,
      paymentId,
      shippingAddressId,
      shippingProviderId,
      voucherCode,
    });
    return response.data.orderId;
  };

  const onApprove = async (data, actions) => {
    try {
      // Notify for server
      const response = await checkout.confirmPaypal(data.orderID);

      const { exitcode } = response.data;
      if (exitcode === 0) {
        alert("Transaction done!");
      } else {
        alert("Transaction failed");
      }
    } catch (err) {
      console.error(err)
      alert("Server error");
    }
  };

  return (
    <div>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        style={{ layout: "horizontal" }}
      />
    </div>
  );
};

export default PaypalButton;
