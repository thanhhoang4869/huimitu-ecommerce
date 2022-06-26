import React from "react";

const LogInPage = () => {
  return (
    <div className="d-flex container justify-content-center my-5">
      <form
        className="d-flex flex-column justify-content-center align-items-center form_container col-xl-4 col-md-6 col-xs-12 row"
        onSubmit={() => {}}
      >
        <h2 className="mb-4 text-key">LOG IN</h2>

        <div className="login-input d-flex align-items-center input-group mb-3 p-2">
          <i className="fa fa-envelope"></i>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={() => {}}
            onChange={() => {}}
          />
        </div>
        <div className="login-input d-flex align-items-center input-group mb-3 p-2">
          <i class="fa fa-lock"></i>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={() => {}}
            onChange={() => {}}
          />
          <i class="fa fa-eye-slash ml-auto "></i>
        </div>
        <a className="login-forget-link mb-3 align-self-end">Forgotten password?</a>
        <button className="primary-btn bg-key login-btn" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default LogInPage;
