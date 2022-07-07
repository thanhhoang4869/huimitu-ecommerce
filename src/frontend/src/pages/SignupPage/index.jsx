import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "components/GoogleLoginButton";
import account from "services/account";
import swal from "sweetalert2";

import "./style.css";

const SignupPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();

  const validateFields = (password, passwordConfirm, email, phone) => {
    if (password !== passwordConfirm) {
      swal.fire({
        title: "Error",
        text: "Mật khẩu và mật khẩu xác nhận không trùng khớp",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      swal.fire({
        title: "Error",
        text: "Vui lòng nhập email hợp lệ",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (password.length < 6) {
      swal.fire({
        title: "Error",
        text: "Mật khẩu phải có ít nhất 6 ký tự",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (phone.length !== 10) {
      swal.fire({
        title: "Error",
        text: "Vui lòng nhập số điện thoại hợp lệ",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  };

  const onSubmit = async (e) => {
    if (email && password && passwordConfirm && fullname && phone) {
      validateFields(password, passwordConfirm, email, phone);
      try {
        const entity = {
          email,
          password,
          fullname,
          phone,
        };
        const response = await account.signup(entity);
        const { exitcode, message } = response.data;

        if (exitcode === 0) {
          swal.fire({
            title: "Success",
            text: "Vui lòng kiểm tra email để xác nhận tài khoản!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigator("/login");
        } else {
          setError(message);
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      swal.fire({
        text: "Vui lòng nhập tất cả thông tin",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  const handleGoogleSucces = async (response) => {
    const { credential } = response;

    const result = await account.googleLogin(credential);
    const { exitcode, token } = result.data;

    if (exitcode === 0) {
      props.handleLogin(token);
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
        <h2 className="mb-4 color-key">Đăng ký</h2>

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
            placeholder="Mật khẩu"
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
            placeholder="Nhập lại mật khẩu"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-user"></i>
          <input
            name="fullname"
            placeholder="Họ tên"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="signup-input d-flex align-items-center input-group mb-3 p-2">
          <i className="ml-2 fa fa-phone"></i>
          <input
            name="phone"
            type="number"
            placeholder="SĐT"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button
          className="primary-btn bg-key signup-btn col-6"
          type="button"
          onClick={onSubmit}
        >
          Đăng ký
        </button>
      </form>
      <div className="my-2 d-flex flex-column justify-content-center align-items-center">
        <p>hoặc</p>
        <GoogleLoginButton
          handleGoogleError={handleGoogleError}
          handleGoogleSucces={handleGoogleSucces}
        />

        <p className="mt-3">
          Đã có tài khoản?
          <Link to="/login" className="text-key pointer pl-1">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
