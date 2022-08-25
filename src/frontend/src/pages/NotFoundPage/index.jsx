import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import React, {useEffect} from "react";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);
  
  return (
    <Result
      status="404"
      className="d-flex container flex-column justify-content-center my-5"
      style={{ height: "60vh" }}
      title="404"
      subTitle={t("notFoundPage.subtitle")}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigation("/");
          }}
        >
          {t("navigation.home")}
        </Button>
      }
    />
  );
};

export default NotFoundPage;
