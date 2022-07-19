import { Pagination } from "antd";
import React from "react";

const showTotal = (total) => `Total ${total} items`;

const Paging = (props) => {
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
