import React from "react";
import { Route, Routes } from "react-router-dom";
import CouponPolicy from "./CouponPolicy";
import RefundPolicy from "./RefundPolicy";
import ShippingPolicy from "./ShippingPolicy";

const PolicyPage = () => {
  return (
    <section className="hero">
      <div className="container">
        <Routes>
          <Route path="shipping" element={<ShippingPolicy />} />
          <Route path="refund" element={<RefundPolicy />} />
          <Route path="coupons" element={<CouponPolicy />} />
        </Routes>
      </div>
    </section>
  );
};

export default PolicyPage;
