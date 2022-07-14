import AccountBar from "components/AccountBar";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import accountService from "services/account";
import ChangePasswordPage from "./ChangePasswordPage";
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
                element={<UserInformationPage />}
              />
              <Route path="/changePassword" element={<ChangePasswordPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
