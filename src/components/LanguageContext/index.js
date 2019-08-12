import React, { useState, Children } from 'react';
import { LanguageProvider } from './Context';
import supportedLanguages,{getLanguageInfo, getLanguageFirstPart} from './languages';
import Language from './LanguageMenu';


const LanguageContextProvider = ({children}) => {

    const [language, setLanguage] = useState(getLanguageInfo("en"));


    const handleLanguageSet = (value) => {

        const localeKey = getLanguageFirstPart(value);
        const newLang = supportedLanguages[localeKey];


        console.log("SETTING LANG...", newLang);
        setLanguage(newLang);
    }

    return <LanguageProvider value={language}>
        <Language handleMenuClick={handleLanguageSet}/>
        {children}
    </LanguageProvider>;
}

export default LanguageContextProvider;