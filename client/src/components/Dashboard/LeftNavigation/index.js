import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { FormattedMessage } from "react-intl";


export default function LeftNavigation() {
  const items = [{
    path: '/overview',
    text: <FormattedMessage id="OVERVIEW" />
  }, {
    path: '/home',
    text: <FormattedMessage id="DASHBOARD" />
  }, {
    path: '/statistics',
    text: <FormattedMessage id="STATISTICS" />
  }, {
    path: '/devices',
    text: <FormattedMessage id="DEVICES" />
  }, {
    path: '/faults',
    text: <FormattedMessage id="FAULTS" />
  }, {
    path: '/activity-log',
    text: <FormattedMessage id="ACTIVITY_LOG" />
  }, {
    path: '/settings',
    text: <FormattedMessage id="SETTINGS" />
  }];

  return (
    <ul className="menu">
      {items.map(item => (
        <li key={item.path} className="menu__item">
          <NavLink to={item.path}>{item.text}</NavLink>
        </li>
      ))}
    </ul>
  );
}
