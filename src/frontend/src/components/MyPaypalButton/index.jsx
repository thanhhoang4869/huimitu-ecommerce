import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import checkoutService from "services/checkout";

const MyPaypalButton = (props) => {
  const shippingAddressId = props.shippingAddressId;
  const receiverName = props.receiverName;
  const receiverPhone = props.receiverPhone;
  const handleCheckout = props.handleCheckout;

  const createOrder = async (data, actions) => {
    const orderId = await handleCheckout();
    if (orderId) {
      return orderId;
    }
    return null;
  };

  const onApprove = async (data, actions) => {
    try {
      // Notify for server
      const response = await checkoutService.confirmPaypal(data.orderID);

      const { exitcode } = response.data;
      if (exitcode === 0) {
        alert("Transaction done!");
      } else {
        alert("Transaction failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div>
      <PayPalButtons
        createOrder={createOrder}
        forceReRender={[shippingAddressId, receiverName, receiverPhone]}
        onApprove={onApprove}
        style={{ layout: "horizontal", tagline: false }}
      />
    </div>
  );
};

export default MyPaypalButton;
