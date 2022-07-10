import { Pagination } from "antd";
import React from "react";

const showTotal = (total) => `Total ${total} items`;

const Paging = () => (
  <>
    <Pagination total={50} showTotal={showTotal} />
  </>
);

export default Paging;
