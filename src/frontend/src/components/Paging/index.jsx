import { Pagination } from "antd";
import React from "react";

const showTotal = (total) => `Total ${total} items`;

const Paging = (props) => (
  <>
    <Pagination
      total={props.total}
      pageSize={6}
      showTotal={showTotal}
      onChange={(page) => {
        props.onPageChange(page);
      }}
    />
  </>
);

export default Paging;
