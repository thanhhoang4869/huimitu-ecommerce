import { Avatar, Button, Descriptions, Badge } from "antd";
import defaultAvatar from "images/avatar.png";
import moment from "moment";
import React from "react";

const UserInformationPage = (props) => {
  const account = props.account || {};

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Avatar
          className="border rounded-circle"
          size={128}
          src={account.avatar || defaultAvatar}
        />
      </div>
      <div className="my-2 d-flex justify-content-center">
        <Button style={{ width: "128px" }} size="large">
          Upload avatar
        </Button>
      </div>
      <Badge.Ribbon
        text={account.verified ? "Đã xác thực" : "Chưa xác thực"}
        color={account.verified ? "green" : "red"}
      >
        <Descriptions bordered className="border rounded my-4">
          <Descriptions.Item label="Họ tên" span={3}>
            {account.fullname}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {account.birthday}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính" span={2}>
            {account.gender === "male" ? "Nam" : "Nữ"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{account.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại" span={2}>
            {account.phone}
          </Descriptions.Item>
        </Descriptions>
      </Badge.Ribbon>
    </div>
  );
};

export default UserInformationPage;
