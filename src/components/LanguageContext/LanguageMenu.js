import React, {useState} from "react";
import { Menu, Dropdown, Button } from "antd";
import { LanguageProvider } from "./Context";
import supportedLanguages, { getFlagCode } from "./languages";
import Flag from "react-flags";

const MenuItems = Object.values(supportedLanguages).map(lang => {
    return <Menu.Item key={lang.code}>
      {/* <Flag
        name={getFlagCode(lang.code)}
        format="png"
        pngSize={64}
        shiny={true}
        alt={`${lang.language}`}
      /> */}
      <span>{lang.language}</span>
    </Menu.Item>
});




const Language = ({ lang, children, handleMenuClick }) => {

  const [selectedLang, setSelectedLang] = useState(null);

  const handleLangSelection = (ev) => {

    console.log("HANDLE SELECTION1!!", ev);
    setSelectedLang(ev.key);
    handleMenuClick(ev.key);
  }

  const LanguageMenu = (<Menu onClick={handleLangSelection}>
    {MenuItems}
</Menu>);

  return (
    <div className="language-selection-dropdown">
      <Dropdown overlay={LanguageMenu}>
      <Button>
        {selectedLang ? selectedLang : "Select.."} 
      </Button>
      </Dropdown>
      {/* <LanguageProvider value={lang}>...children</LanguageProvider> */}
    </div>
  );
};


export default Language;
