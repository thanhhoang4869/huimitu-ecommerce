import React from "react";
import { Route, Routes } from "react-router-dom";

import SideBar from "./SideBar";
import ViewProductSection from "./ViewProductSection";
import AddProductSection from "./AddProductSection";
import ViewVoucherSection from "./ViewVoucherSection";
import AddVoucherSection from "./AddVoucherSection";
import EditProductSection from "./EditProductSection";
import PendingOrderSection from "./ViewOrderSection";
import RefundOrderSection from "./RefundOrderSection";
import SuccessOrderSection from "./SuccessOrderSection";
import ShippingOrderSection from "./ShippingOrderSection";
import CancelOrderSection from "./CancelOrderSection";

import StatisticSection from "pages/StatisticSection";

const AdminPage = () => {
  
  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="row">
            <SideBar />
            <div
              className="col-lg-9"
              style={{
                minHeight: "70vh",
              }}
            >
              <Routes>
                <Route path="/statistic" element={<StatisticSection />} />
                <Route path="/viewProduct" element={<ViewProductSection />} />
                <Route path="/addProduct" element={<AddProductSection />} />
                <Route path="/viewVoucher" element={<ViewVoucherSection />} />
                <Route path="/addVoucher" element={<AddVoucherSection />} />
                <Route path="/pendingOrder" element={<PendingOrderSection />}/>
                <Route path="/refundOrder" element={<RefundOrderSection />}/>
                <Route path="/successOrder" element={<SuccessOrderSection />}/>
                <Route path="/shippingOrder" element={<ShippingOrderSection />}/>
                <Route path="/cancelOrder" element={<CancelOrderSection />}/>

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
