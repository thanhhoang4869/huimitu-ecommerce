import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "components/GoogleLoginButton";
import authService from "services/auth";
import swal from "sweetalert2";

import "./style.css";
import { useContext } from "react";
import { AccountContext } from "context/AccountContext";
import {
  validateEmail,
  validateMinLength,
  validatePhone,
} from "utils/validator";
import { Button, Checkbox } from "antd";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const SignupPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const { login } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigator = useNavigate();

  const validateFields = (
    password,
    passwordConfirm,
    email,
    phone,
    acceptTerms
  ) => {
    if (password !== passwordConfirm) {
      swal.fire({
        title: "Error",
        text: t("userInformation.notMatchingPass"),
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (!validateEmail(email)) {
      swal.fire({
        title: "Error",
        text: t("userInformation.enterValidEmail"),
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (!validateMinLength(password, 6)) {
      swal.fire({
        title: "Error",
        text: t("userInformation.moreThan6Letters"),
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!validatePhone(phone)) {
      swal.fire({
        title: "Error",
        text: t("userInformation.pleaseEnterValidPhoneNumber"),
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    console.log(acceptTerms);
    if (!acceptTerms) {
      swal.fire({
        title: "Error",
        text: t("userInformation.pleaseAcceptTerms"),
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    return true;
  };

  const onSubmit = async (e) => {
    try {
      if (email && password && passwordConfirm && fullname && phone) {
        if (
          !validateFields(password, passwordConfirm, email, phone, acceptTerms)
        ) {
          return;
        }
        const entity = {
          email,
          password,
          fullname,
          phone,
        };

        setIsLoading(true);
        const response = await authService.signup(entity);
        setIsLoading(false);

        const { exitcode, message } = response.data;

        if (exitcode === 0) {
          swal.fire({
            title: "Success",
            text: t("signupPage.checkEmail"),
            icon: "success",
            confirmButtonText: "OK",
          });
          navigator("/login");
        } else {
          setError(message);
        }
      } else {
        swal.fire({
          text: t("userInformation.pleaseEnterAll"),
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      navigator("/error");
    }
  };

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;

    const result = await authService.googleLogin(credential);
    const { exitcode, token } = result.data;

    if (exitcode === 0) {
      login(token);
    } else {
      setError(result.data);
    }
  };

  const handleGoogleError = () => {
    setError("Đăng nhập thất bại");
  };

  return (
    <div className="d-flex container flex-column justify-content-center my-4">
      {error && <p className="text-danger">{error}</p>}
      <form className="d-flex flex-column justify-content-center align-items-center form_container col-xl-4 col-md-6 col-xs-12 row">
        <h2 className="mb-4 color-key">{t("loginPage.signup")}</h2>

        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-envelope"></i>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-lock"></i>
          <input
            name="password"
            type="password"
            autoComplete="on"
            placeholder={t("userInformation.enterPass")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-lock"></i>
          <input
            name="passwordConfirm"
            type="password"
            autoComplete="on"
            placeholder={t("userInformation.enterPass")}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-user"></i>
          <input
            name="fullname"
            placeholder={t("userInformation.fullname")}
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-phone"></i>
          <input
            name="phone"
            placeholder={t("userInformation.phoneNumber")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="align-items-left mb-3 p-2" style={{ width: "100%" }}>
          <Checkbox
            value={acceptTerms}
            onChange={(event) => {
              setAcceptTerms(event.target.checked);
            }}
          >
            {t("signupPage.hasAgreed")}{" "}
            <Link to="/policy/terms">{t("signupPage.termsPolicy")}</Link>{" "}
            {t("signupPage.and")}{" "}
            <Link to="/policy/privacy">{t("signupPage.privacyPolicy")}</Link>{" "}
            {t("signupPage.ofHuimitu")}
          </Checkbox>
        </div>
        <Button
          className="primary-btn bg-key signup-btn col-6"
          type="primary"
          size="large"
          onClick={onSubmit}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {t("loginPage.signup")}
        </Button>
      </form>
      <div className="my-2 d-flex flex-column justify-content-center align-items-center">
        <p>{t("loginPage.or")}</p>
        <GoogleLoginButton
          onError={handleGoogleError}
          onSuccess={handleGoogleSuccess}
        />

        <p className="mt-3">
          {t("loginPage.hadAccount")}
          <Link to="/login" className="text-key pointer pl-1">
            {t("loginPage.login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
