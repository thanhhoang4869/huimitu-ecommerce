import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import GoogleLoginButton from "components/GoogleLoginButton";
import account from "services/account";

const LogInPage = (props) => {
  const handleLogin = props.handleLogin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await account.login(email, password);
      const { exitcode, token } = response.data;

      if (exitcode === 0) {
        handleLogin(token);
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleGoogleSucces = async (response) => {
    const { credential } = response;

    const result = await account.googleLogin(credential);
    const { exitcode, token } = result.data;

    if (exitcode === 0) {
      handleLogin(token);
    } else {
      setError(result.data);
    }
  };

  const handleGoogleError = () => {
    setError("Login with Google failed");
  };

  return (
    <div className="d-flex container flex-column justify-content-center my-5">
      {error && <p className="text-danger">{error.message}</p>}
      {localStorage.getItem("token") && <Navigate to="/" replace={true} />}
      <form
        className="d-flex flex-column justify-content-center align-items-center form_container col-xl-4 col-md-6 col-xs-12 row"
        onSubmit={onSubmit}
      >
        <h2 className="mb-4 color-key">LOG IN</h2>

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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a href="/#" className="text-key mb-3 align-self-end">
          Forgotten password?
        </a>
        <button className="primary-btn bg-key login-btn col-6" type="submit">
          Log in
        </button>
      </form>
      <div className="my-2 d-flex flex-column justify-content-center align-items-center">
        <p>or continue with</p>
        <GoogleLoginButton
          handleGoogleError={handleGoogleError}
          handleGoogleSucces={handleGoogleSucces}
        />

        <p className="mt-5">
          Do not have an account?
          <Link to="/signup" className="text-key pointer pl-1">
            SIGN UP
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
