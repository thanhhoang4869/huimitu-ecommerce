import React, { useState } from "react";
import huimitu from "../../api/huimitu";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import { Link } from "react-router-dom";


const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const hashedPassword = sha256(password).toString();
    const json = { email, password: hashedPassword };
    console.log(sha256(password).toString());

    const response = await huimitu.post("/login", json)
    .catch(error => {
      alert(error);
    });


    alert(response.data.message);
    console.log(response.data);
  };

  return (
    <div className="d-flex container flex-column justify-content-center my-5">
      <form
        className="d-flex flex-column justify-content-center align-items-center form_container col-xl-4 col-md-6 col-xs-12 row"
        onSubmit={onSubmit}
      >
        <h2 className="mb-4 text-key">LOG IN</h2>

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
        <a className="login-forget-link mb-3 align-self-end">
          Forgotten password?
        </a>
        <button className="primary-btn bg-key login-btn col-6" type="submit">
          Log in
        </button>
      </form>
      <div className="my-2 d-flex flex-column justify-content-center align-items-center">
        <p>or continue with</p>
        <Link to="/#">
          <img
            className="pointer"
            src="./assets/img/google.jpg"
          />
        </Link>

        <p className="mt-5">
          Do not have an account? 
          <Link to="/signup" className="text-key pointer pl-1">
            REGISTER
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
