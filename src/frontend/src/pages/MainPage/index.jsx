import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import account from "../../services/account";

import Header from "../../components/Header";
import LandingPage from "../LandingPage";
import CommercePage from "../CommercePage";
import Footer from "../../components/Footer";
import LogInPage from "../LogInPage";

const MainPage = () => {
  const [token, setToken] = useState();
  useEffect(() => {
      setToken(account.getLocalToken())
  }, []);

  return (
    <div className="MainDiv">
      <BrowserRouter>
      <Header token={token} setToken={setToken} />
        <Routes>
          <Route exact path="/category/*" element={<CommercePage />} />
            <Route exact path="/search/*" element={<CommercePage />} />
            <Route exact path="/*" element={<LandingPage />} />
            <Route exact path="/login" element={<LogInPage token={token} setToken={setToken} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default MainPage;
