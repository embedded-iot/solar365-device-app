import React from "react";
import { Tag } from "antd";
import { ALERT_TYPE_COLORS, I18N_ALERT_TYPES } from "../constants";

const StatusTag = ({ status = '-' }) => (
  <Tag color={ALERT_TYPE_COLORS[status] || ''}>
    {I18N_ALERT_TYPES[status] || status}
  </Tag>
);

export default StatusTag;
