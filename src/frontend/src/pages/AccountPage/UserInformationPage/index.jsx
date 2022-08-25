import { Avatar, Button, Descriptions, Badge } from "antd";
import Upload from "antd/lib/upload/Upload";
import { AccountContext } from "context/AccountContext";
import defaultAvatar from "images/avatar.png";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import accountService from "services/account";
import swal from "sweetalert2";
import { isImage, sizeLessMegaByte } from "utils/validator";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const UserInformationPage = (props) => {
  const { account, fetchAccount } = useContext(AccountContext);
  const [isUploading, setIsUploading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetchAccount();
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const uploadProps = {
    maxCount: 1,
    accept: "image/png, image/jpeg",
    showUploadList: false,

    async beforeUpload(file) {
      if (!(isImage(file.type) && sizeLessMegaByte(file.size, 5))) {
        swal.fire({
          text: t("userInformation.unvalidImage"),
          icon: "error",
          confirmButtonText: "OK",
        });
        return false;
      }

      setIsUploading(true);
      const response = await accountService.uploadAvatar(file);
      const { exitcode } = response.data;
      if (exitcode === 0) {
        await swal.fire({
          text: t("userInformation.changeAvaSuccess"),
          icon: "success",
          confirmButtonText: "OK",
        });
        window.location.reload();
      }
      setIsUploading(false);
      return false;
    },
  };

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
        <Upload {...uploadProps}>
          <Button
            disabled={isUploading}
            loading={isUploading}
            shape="round"
            size="large"
          >
            {t("userInformation.uploadAva")}
            
          </Button>
        </Upload>
      </div>
      <Badge.Ribbon
        text={account.verified ? t("userInformation.verified") : t("userInformation.unverified")}
        color={account.verified ? "green" : "red"}
      >
        <Descriptions bordered className="border rounded my-4">
          <Descriptions.Item label={t("userInformation.fullname")} span={3}>
            {account.fullname}
          </Descriptions.Item>
          <Descriptions.Item label={t("userInformation.dob")}>
            {account.birthday}
          </Descriptions.Item>
          <Descriptions.Item label={t("userInformation.gender")} span={2}>
            {account.gender === "male" ? t("userInformation.male") : t("userInformation.female")}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{account.email}</Descriptions.Item>
          <Descriptions.Item label={t("userInformation.phoneNumber")} span={2}>
            {account.phone}
          </Descriptions.Item>
        </Descriptions>
      </Badge.Ribbon>
    </div>
  );
};

export default UserInformationPage;
