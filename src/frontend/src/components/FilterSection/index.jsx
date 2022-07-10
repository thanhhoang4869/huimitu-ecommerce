import React, { useState } from "react";
import "./style.css";
import { Input, InputNumber, Select, Button } from "antd";

const FilterSection = (props) => {
  const { Option } = Select;
  const [selected, setSelected] = useState("def");

  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    disableSelect,
    categoryList,
  } = props;

  const handleChange = (value) => {
    if (!value) {
      return setSelected("def");
    }
    setSelected(value);
  };

  return (
    <div className="filter-container">
      <Select
        disabled={disableSelect}
        allowClear
        value={selected}
        style={{
          width: "220px",
        }}
        onChange={handleChange}
      >
        <Option value="def" hidden>
          Danh mục
        </Option>
        {categoryList.map((category) => (
          <Option value={category.id}>{category.categoryName}</Option>
        ))}
      </Select>

      <div className="filter-container">
        <div className="mr-2">
          <Input.Group compact>
            <Input
              disabled
              style={{
                width: 100,
                textAlign: "center",
                pointerEvents: "none",
              }}
              placeholder="Giá từ"
            />
            <InputNumber
              min={0}
              controls={false}
              style={{ width: 100 }}
              value={minPrice != 0 ? minPrice : undefined}
              onChange={(value) => setMinPrice(value)}
              placeholder="Thấp nhất"
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
              value={maxPrice != 0 ? maxPrice : undefined}
              onChange={(value) => setMaxPrice(value)}
              controls={false}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              className="site-input-right"
              style={{
                width: 100,
              }}
              placeholder="Cao nhất"
            />
          </Input.Group>
        </div>
        <Button
          type="primary"
          onClick={() => {
            props.onFilter();
          }}
        >
          Lọc
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
