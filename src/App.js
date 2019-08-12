import React, {useContext} from "react";
import "./App.css";
import { IntlProvider } from "react-intl";
import Home from "./components/Home";
import messages from "./i18n/locales";
import LanguageContextProvider from './components/LanguageContext';
import 'antd/dist/antd.css';
import LanguageContext from './components/LanguageContext/Context';
import {getLanguageFirstPart} from './components/LanguageContext/languages';

function App() {

  const language = useContext(LanguageContext)

  console.log("FROM APP!!", language);

  const localeKey = getLanguageFirstPart(language.code);

  console.log("MESSAGES??", messages[localeKey]);

  return (
    <div className="App">
      <LanguageContextProvider>
        <IntlProvider locale={localeKey} messages={messages[localeKey]}>
          <Home/>
        </IntlProvider>
      </LanguageContextProvider>
    </div>
  );
}

export default App;
