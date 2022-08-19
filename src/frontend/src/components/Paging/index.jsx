import { Pagination } from "antd";
import React, {useEffect} from "react";
import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";


const Paging = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const showTotal = (total) => `${t("totalSection.total")}: ${total}`;

  console.log(props);
  return (
    <>
      <Pagination
        total={props.total}
        current={props.current}
        pageSize={6}
        showTotal={showTotal}
        onChange={(page) => {
          props.onPageChange(page);
        }}
      />
    </>
  );
};

export default Paging;
