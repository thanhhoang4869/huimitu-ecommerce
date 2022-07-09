import { Pagination } from "antd";
import React from "react";

const showTotal = (total) => `Total ${total} items`;

const Paging = (props) => (
  <>
    <Pagination
      total={50}
      pageSize={6}
      showTotal={showTotal}
      onChange={(page) => {
        alert(page);
      }}
    />
  </>
);

export default Paging;
