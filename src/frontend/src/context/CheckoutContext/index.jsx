import { createContext } from "react";
import { useState } from "react";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState(1);

  return (
    <CheckoutContext.Provider
      value={{
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
