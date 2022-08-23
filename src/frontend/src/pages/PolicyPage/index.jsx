import React from "react";
import { Route, Routes } from "react-router-dom";
import DisclaimerPage from "./DisclaimerPage";
import WarrantyPage from "./WarrantyPage";
import ShippingPolicy from "./ShippingPolicy";
import TermConditionPage from "./TermConditionPage";
import PrivacyPage from "./PrivacyPage";

const PolicyPage = () => {
  return (
    <section className="hero">
      <div className="container">
        <Routes>
          <Route path="disclaimer" element={<DisclaimerPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="shipping" element={<ShippingPolicy />} />
          <Route path="terms" element={<TermConditionPage />} />
          <Route path="warranty" element={<WarrantyPage />} />
        </Routes>
      </div>
    </section>
  );
};

export default PolicyPage;
