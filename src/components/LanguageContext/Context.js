import React from "react";
import { getLanguageInfo } from "./languages";

const defaultLanguage = getLanguageInfo("en");

console.log("DEFAULT LANGUAGE...", defaultLanguage);

const LanguageContext = React.createContext({
  ...defaultLanguage
});

export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;
export default LanguageContext;
