import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import config from "../../config/config";

const PaypalButton = () => {
  const create_order = (data, actions) => {
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

  const on_approve = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      console.log(`Transaction completed by ${name}`);
    });
  };

  return (
    <div>
      <PayPalScriptProvider options={config.paypal}>
        <PayPalButtons
          createOrder={create_order}
          onApprove={on_approve}
          style={{ layout: "horizontal" }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalButton;
