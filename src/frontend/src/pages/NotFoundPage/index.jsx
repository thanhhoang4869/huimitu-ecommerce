import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
  const navigation = useNavigate();
  return (
    <Result
      status="404"
      className="d-flex container flex-column justify-content-center my-5"
      style={{ height: "60vh" }}
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigation("/");
          }}
        >
          Homepage
        </Button>
      }
    />
  );
};

export default NotFoundPage;
