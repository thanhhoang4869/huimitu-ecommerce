import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
  const navigation = useNavigate();
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
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
