import React, { useContext } from "react";
import { Menu, Dropdown, Button } from "antd";
import supportedLanguages, {
  getFlagCode,
  getLanguageFirstPart
} from "./languages";
import LanguageContext from ".";
import './languageMenu.css';
import { FormattedMessage } from 'react-intl';

const LanguageMenuContainer = () => {
  const [state, setState] = useContext(LanguageContext);

  const handleLangSelection = ev => {
    const lang = supportedLanguages[getLanguageFirstPart(ev.key)];

    setState(state => ({ ...state, ...lang }));
  };

  const MenuItems = Object.values(supportedLanguages).map(lang => {
    return (
      <Menu.Item key={lang.code}>
        <img 
          src={`/countryFlags/${getLanguageFirstPart(lang.code)}.svg`}
          alt={`${lang.language} Flag`}
          width="26"
          height="26"
          />
        <span className="language-caption">
          <FormattedMessage id={`${lang.language.toLowerCase()}-lang-caption`}/>
        </span>
      </Menu.Item>
    );
  });

  const LanguageMenu = (
    <div className="language-menu">
      <Menu onClick={handleLangSelection}>{MenuItems}</Menu>;
    </div>
  )

  return (
    <div className="language-menu-container">
      <Dropdown overlay={LanguageMenu}>
        <Button>
        <img 
          src={`/countryFlags/${getLanguageFirstPart(state.code)}.svg`}
          alt={`${state.language} Flag`}
          width="30"
          height="24"
          />
         <span className="language-caption">
          <FormattedMessage id={`${state.language.toLowerCase()}-lang-caption`}/>
        </span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default LanguageMenuContainer;
