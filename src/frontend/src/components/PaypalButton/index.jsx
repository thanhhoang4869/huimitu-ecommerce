import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import checkoutService from "services/checkout";

const PaypalButton = (props) => {
  const handleCheckout = props.handleCheckout;

  const onClick = async (data, actions) => {
    console.log("Run")
    const orderId = await handleCheckout();
    if (!orderId) {
      return actions.reject();
    }
    return orderId;
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
        onClick={onClick}
        onApprove={onApprove}
        style={{ layout: "horizontal", tagline: false }}
      />
    </div>
  );
};

export default PaypalButton;
