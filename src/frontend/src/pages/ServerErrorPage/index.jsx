import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
  const navigation = useNavigate();
  return (
    <Result
      status="500"
      title="500"
      subTitle="Đã có lỗi xảy ra. Vui lòng thử lại sau."
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigation("/");
          }}
        >
          Trang chủ
        </Button>
      }
    />
  );
};

export default NotFoundPage;
