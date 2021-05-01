import React, { useContext } from 'react';
import { Navbar, NavbarBrand } from "reactstrap";

import { languageContext } from "../Wrapper";


const Header = () => {
  const context = useContext(languageContext);
  console.log(context)
  return (
    <Navbar color="light" light>
      <NavbarBrand href="/">Solar365 Portal</NavbarBrand>
      <select value={context.locale} onChange={context.selectLanguage}>
        <option value="en">English</option>
        <option value="vi-VN">Việt Nam</option>
      </select>
    </Navbar>
  );
};

export default Header;
