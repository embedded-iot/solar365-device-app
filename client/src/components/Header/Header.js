import React, { useContext } from 'react';
import { Navbar, NavbarBrand } from "reactstrap";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

import { languageContext } from "../Wrapper";
import "./style.scss";


const Header = () => {
  const context = useContext(languageContext);
  const MenuIcon = context.isLeftMenu ? MenuFoldOutlined : MenuUnfoldOutlined;
  return (
    <Navbar color="light" light>
      <div>
        <MenuIcon className='menu-toggle-button'
                  style={{ fontSize: '25px', color: 'red' }}
                  onClick={() => context.setLeftMenu(!context.isLeftMenu) }
        />
        <NavbarBrand href="/">Solar365 Portal</NavbarBrand>
      </div>
      <select value={context.locale} onChange={context.selectLanguage}>
        <option value="en">English</option>
        <option value="vi-VN">Việt Nam</option>
      </select>
    </Navbar>
  );
};

export default Header;
