import AccountBar from "components/AccountBar";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import accountService from "services/account";
import CartPage from "./CartPage";
import ShippingAddressPage from "./ShippingAddressPage";
import UpdateInformationPage from "./UpdateInformationPage";
import UserInformationPage from "./UserInformationPage";

const AccountPage = () => {
  const [account, setAccount] = useState({});
  const navigator = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await accountService.getInformation();
      const { exitcode, account } = response.data;
      if (exitcode === 0) {
        setAccount(account);
      }
    } catch (err) {
      navigator("/error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <AccountBar />
          <div className="col-lg-9">
            <Routes>
              <Route
                exact
                path="/userInformation"
                element={<UserInformationPage account={account} />}
              />
              <Route
                exact
                path="/shippingAddress"
                element={<ShippingAddressPage />}
              />
              <Route exact path="/cart" element={<CartPage />} />
              <Route exact path="/order" element={<></>} />
              <Route
                exact
                path="/changeInformation"
                element={<UpdateInformationPage account={account} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
