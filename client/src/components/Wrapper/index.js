import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import VI from '../../translations/vi.json';
import EN from '../../translations/en.json';

const Context = React.createContext();
// const local = navigator.language;
const local = 'en';
let lang = '';
if (local === 'vi-VN') {
  lang = VI;
} else {
  lang = EN;
}

window.i18n = lang;

const Wrapper = (props) => {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);
  const [isLeftMenu, setLeftMenu] = useState(true);
  function selectLanguage(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);
    if (newLocale === 'en') {
      setMessages(EN);
      window.i18n = EN;
    } else {
      window.i18n = VI;
      setMessages(VI);
    }
  }

  return (
    <Context.Provider value={{ locale, selectLanguage, isLeftMenu, setLeftMenu }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};
export default Wrapper;
export const languageContext = Context;
