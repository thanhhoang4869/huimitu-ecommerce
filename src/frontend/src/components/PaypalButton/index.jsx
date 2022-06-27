import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = () => {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "100",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      console.log(`Transaction completed by ${name}`);
    });
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
