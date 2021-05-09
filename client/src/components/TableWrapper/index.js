import React from "react";
import { Table } from "antd";

import "./style.scss";

const TableWrapper = (props) => {
  const dataSource = props.dataSource && props.dataSource.map((item, index) => ({ ...item, key: index.toString() }));
  return (
    <Table {...props} dataSource={dataSource} />
  )
};


export default TableWrapper;
