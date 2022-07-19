import React from "react";
import { Route, Routes } from "react-router-dom";

import SideBar from "./SideBar";
import ViewProductSection from "./ViewProductSection";
import AddProductSection from "./AddProductSection";
import ViewVoucherSection from "./ViewVoucherSection";
import AddVoucherSection from "./AddVoucherSection";

const AdminPage = () => {
  return (
    <div style={{ height: "80vh" }}>
      <section className="hero">
        <div className="container">
          <div className="row">
            <SideBar />
            <div className="col-lg-9">
              <Routes>
                <Route path="/viewProduct" element={<ViewProductSection />} />
                <Route path="/addProduct" element={<AddProductSection />} />
                <Route path="/viewVoucher" element={<ViewVoucherSection />} />
                <Route path="/addVoucher" element={<AddVoucherSection />} />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
