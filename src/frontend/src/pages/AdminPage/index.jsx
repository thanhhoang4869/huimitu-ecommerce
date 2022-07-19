import React from "react";
import { Route, Routes } from "react-router-dom";

import SideBar from "./SideBar";
import ViewProductSection from "./ViewProductSection";
import AddProductSection from "./AddProductSection";
import ViewVoucherSection from "./ViewVoucherSection";
import AddVoucherSection from "./AddVoucherSection";
import EditProductSection from "./EditProductSection";

const AdminPage = () => {
  return (
    <div>
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
                <Route
                  path="/editProduct/:id"
                  element={<EditProductSection />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
