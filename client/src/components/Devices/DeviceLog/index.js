import React from "react";
import TableWrapper from "../../TableWrapper";

const DeviceLog = ({ columns = [], dataSource = [] }) => {
  return (
    <TableWrapper columns={columns} dataSource={dataSource} />
  );
};

export default DeviceLog;
