import React, { useState } from "react";
import { getLanguageInfo, getLanguageFirstPart } from "./languages";
import { IntlProvider } from "react-intl";
import messages from "../../i18n/locales";

const defaultLanguage = getLanguageInfo("en");
const LanguageContext = React.createContext(defaultLanguage.code);

const LanguageProvider = props => {
  const [state, setState] = useState({ ...defaultLanguage });
  const localeKey = getLanguageFirstPart(state.code);

  return (
    <div className="language-provider-container">
      <LanguageContext.Provider value={[state, setState]}>
        <IntlProvider locale={localeKey} messages={messages[localeKey]}>
          {props.children}
        </IntlProvider>
      </LanguageContext.Provider>
    </div>
  );
};

export default LanguageContext;
export { LanguageProvider };
