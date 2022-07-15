import AccountBar from "components/AccountBar";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import accountService from "services/account";
import CartPage from "./CartPage";
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
                path="/userInformation"
                element={<UserInformationPage account={account} />}
              />
              <Route path="/cart" element={<CartPage/>} />
              <Route path="/order" element={<></>} />
              <Route
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
