import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import messages from './locales';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      "en-US": messages.en,
      "el-GR": messages.el, 
      "es-ES": messages.es
    },
    lng: "en-US",
    fallbackLng: "en-US",
    keySeparator: true, //Read messages in form "home.title"
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;