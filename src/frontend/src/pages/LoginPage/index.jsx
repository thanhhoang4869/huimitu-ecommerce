import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLoginButton from "components/GoogleLoginButton";
import authService from "services/auth";
import swal from "sweetalert2";

import "./style.css";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { validateEmail } from "utils/validator";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const { state } = useLocation();
  const navigator = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const validateFields = (email, password) => {
    if (!email) {
      swal.fire({
        title: "Error",
        text: "Vui lòng nhập email",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }
    if (!password) {
      swal.fire({
        title: "Error",
        text: "Vui lòng nhập password",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }
    if (!validateEmail(email)) {
      swal.fire({
        title: "Error",
        text: "Vui lòng nhập email hợp lệ",
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateFields(email, password)) {
      try {
        const response = await authService.login(email, password);
        const { exitcode, token } = response.data;

        // eslint-disable-next-line default-case
        switch (exitcode) {
          case 0: {
            login(token);
            navigator(state?.path || "/");
            break;
          }
          case 101: {
            swal.fire({
              text: "Email hoặc mật khẩu không chính xác",
              icon: "error",
              confirmButtonText: "OK",
            });
            break;
          }
          case 102: {
            swal.fire({
              text: "Email chưa được xác thực",
              icon: "error",
              confirmButtonText: "OK",
            });
            break;
          }
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    console.log(response);

    const result = await authService.googleLogin(credential);
    const { exitcode, token } = result.data;

    if (exitcode === 0) {
      login(token);
      navigator(state?.path || "/");
    } else {
      setError(result.data);
    }
  };

  const handleGoogleError = () => {
    setError("Login with Google failed");
  };

  return (
    <div className="d-flex container flex-column justify-content-center my-5">
      {error && <p className="text-danger">{error}</p>}
      <form
        className="d-flex flex-column justify-content-center align-items-center form_container col-xl-4 col-md-6 col-xs-12 row"
        onSubmit={onSubmit}
      >
        <h2 className="mb-4 color-key">Đăng nhập</h2>

        <div className="login-input d-flex align-items-center input-group mb-3 p-2">
          <i className="fa fa-envelope"></i>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-input d-flex align-items-center input-group mb-3 p-2">
          <i className="fa fa-lock"></i>
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a href="/#" className="text-key mb-3 align-self-end">
          Quên mật khẩu?
        </a>
        <button className="primary-btn bg-key login-btn col-6" type="submit">
          Đăng nhập
        </button>
      </form>
      <div className="my-2 d-flex flex-column justify-content-center align-items-center">
        <p>hoặc</p>
        <GoogleLoginButton
          onError={handleGoogleError}
          onSuccess={handleGoogleSuccess}
        />

        <p className="mt-5">
          Chưa có tài khoản?
          <Link to="/signup" className="text-key pointer pl-1">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
