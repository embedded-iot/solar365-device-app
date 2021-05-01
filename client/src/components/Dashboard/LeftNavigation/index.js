import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { FormattedMessage } from "react-intl";


export default function LeftNavigation() {
  const items = [{
    path: '/home',
    text: <FormattedMessage id="OVERVIEW" />
  }, {
    path: '/statistics',
    text: <FormattedMessage id="STATISTICS" />
  }, {
    path: '/devices',
    text: <FormattedMessage id="DEVICES" />
  }, {
    path: '/logger-fault',
    text: <FormattedMessage id="LOGGER_FAULT" />
  }, {
    path: '/solar-fault',
    text: <FormattedMessage id="SOLAR_FAULT" />
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
