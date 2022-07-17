import TotalSection from "./TotalSection";
import InformationSection from "./InformationSection";
import React, {createContext, useState} from 'react'
import { useContext } from "react";
const PaymentMethodContext = createContext();

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(1)

  return (
    <>
      <div className="checkout p-2 mb-5">
        <section>
          <div className="container px-md-2 px-lg-3">
            <div className="row">
              <PaymentMethodContext.Provider value={[paymentMethod, setPaymentMethod]}>
                <TotalSection />
                <InformationSection />
              </PaymentMethodContext.Provider>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CheckoutPage;
export  {PaymentMethodContext};
