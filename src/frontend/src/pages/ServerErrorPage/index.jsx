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
      status="500"
      title="500"
      subTitle={t("serverErrorPage.subtitle")}
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
