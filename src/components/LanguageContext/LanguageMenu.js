import React, { useContext } from "react";
import { Menu, Dropdown, Button } from "antd";
import supportedLanguages, {
  getFlagCode,
  getLanguageFirstPart
} from "./languages";
import Flag from "react-flags";
import LanguageContext from ".";

const LanguageMenuContainer = () => {
  const [state, setState] = useContext(LanguageContext);

  const handleLangSelection = ev => {
    const lang = supportedLanguages[getLanguageFirstPart(ev.key)];

    setState(state => ({ ...state, ...lang }));
  };

  const MenuItems = Object.values(supportedLanguages).map(lang => {
    return (
      <Menu.Item key={lang.code}>
        {/* <Flag
          name={getFlagCode(lang.code)}
          format="png"
          pngSize={64}
          shiny={true}
          alt={`${lang.language}`}
        /> */}
        <span>{lang.language}</span>
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
        <Button>{state.language ? state.language : "Select.."}</Button>
      </Dropdown>
    </div>
  );
};

export default LanguageMenuContainer;
