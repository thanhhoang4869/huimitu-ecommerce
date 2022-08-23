import React, { useState, useEffect } from "react";
import "./style.css";
import { Input, InputNumber, Select, Button } from "antd";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const FilterSection = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const { Option } = Select;
  const [selected, setSelected] = useState("default");

  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = props;

  const handleChange = (value) => {
    setSelected(value);
    props.onSortChange(value);
  };

  return (
    <div className="filter-container">
      <Select
        allowClear
        value={selected}
        className="mb-2"
        style={{
          width: "150px",
        }}
        onChange={handleChange}
      >
        <Option key="1" value="default">
          {t("filterSection.default")}
        </Option>
        <Option key="2" value="asc">
          {t("filterSection.lowToHigh")}
        </Option>
        <Option key="3" value="desc">
          {t("filterSection.highToLow")}
        </Option>
      </Select>
      <div className="filter-container">
        <div className="mb-2">
          <Input.Group compact>
            <Input
              disabled
              className="price-filter"
              style={{
                textAlign: "center",
                pointerEvents: "none",
              }}
              placeholder={t("filterSection.from")}
            />
            <InputNumber
              min={0}
              controls={false}
              className="price-filter"
              value={minPrice !== 0 ? minPrice : undefined}
              onChange={(value) => setMinPrice(value)}
              placeholder={t("filterSection.lowest")}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
            <Input
              className="site-input-split"
              style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: "none",
              }}
              placeholder="~"
              disabled
            />
            <InputNumber
              min={0}
              value={maxPrice !== 0 ? maxPrice : undefined}
              onChange={(value) => setMaxPrice(value)}
              controls={false}
              className="price-filter"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder={t("filterSection.highest")}
            />
            <Button
              type="primary"
              onClick={() => {
                props.onFilter();
              }}
            >
              {t("filterSection.filter")}
            </Button>
          </Input.Group>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
