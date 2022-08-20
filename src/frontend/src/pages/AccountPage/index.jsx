import AccountBar from "components/AccountBar";
import OrderListPage from "pages/AccountPage/OrderListPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import CartPage from "./CartPage";
import ShippingAddressPage from "./ShippingAddressPage";
import UpdateInformationPage from "./UpdateInformationPage";
import UserInformationPage from "./UserInformationPage";


const AccountPage = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <AccountBar />
          <div className="col-lg-9">
            <Routes>
              <Route
                path="/userInformation"
                element={<UserInformationPage/>}
              />
              <Route
                exact
                path="/shippingAddress"
                element={<ShippingAddressPage />}
              />
              <Route exact path="/cart" element={<CartPage />} />
              <Route exact path="/order" element={<OrderListPage />} />
              <Route
                exact
                path="/changeInformation"
                element={<UpdateInformationPage/>}
              />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
