import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React, {useEffect} from "react";
import formatter from "utils/formatter";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";
import "./style.css";

const onChange = (filters, sorter, extra) => {
  console.log("params", filters, sorter, extra);
};

const VariantTable = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const variants = props.variants;
  const handleEdit = props.handleEdit;

  const columns = [
    {
      title: t("variant.variantName"),
      dataIndex: "name",
    },
    {
      title: t("variant.price"),
      dataIndex: "price",
    },
    {
      title: t("variant.discountPrice"),
      dataIndex: "discountPrice",
    },
    {
      title: t("variant.stock"),
      dataIndex: "stock",
    },
    {
      dataIndex: "edit",
    },
  ];

  return (
    <Table
      pagination={false}
      columns={columns}
      onChange={onChange}
      dataSource={variants.map((variant, index) => {
        return {
          key: variant?.id ?? index,
          name: variant.variantName,
          price: formatter.formatPrice(+variant.price),
          discountPrice:
            typeof variant.discountPrice !== "undefined"
              ? formatter.formatPrice(+variant.discountPrice)
              : "Không có",
          stock: +variant.stock,
          edit: (
            <div
              className="text-key edit"
              style={{
                textAlign: "center",
              }}
              onClick={() => handleEdit(variant)}
            >
              <EditOutlined />
            </div>
          ),
        };
      })}
    />
  );
};

export default VariantTable;
