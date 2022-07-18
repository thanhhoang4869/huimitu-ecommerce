import TotalSection from "./TotalSection";
import InformationSection from "./InformationSection";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const CheckoutPage = () => {
  const searchParams = useSearchParams();

  return (
    <>
      <div className="checkout p-2 mb-5">
        <section>
          <div className="container px-md-2 px-lg-3">
            <div className="row">
              <TotalSection />
              <InformationSection />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CheckoutPage;