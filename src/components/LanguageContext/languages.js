const supportedLanguages = {
  en: {
    language: "English",
    code: "en-US"
  },
  el: {
    language: "Greek",
    code: "el-GR"
  },
  es: {
    language: "Spanish",
    code: "es-ES"
  }
};

const getLanguageInfo = lang => {
  const supportedKeys = Object.keys(supportedLanguages).join(",");
  console.log("SUPPORTED KEYS!!", supportedKeys);

  if (typeof lang !== "string")
    throw new Error(
      `Error at getLanguageInfo::  invalid parameter lang. Select one of ${supportedKeys}`
    );


  return supportedLanguages[lang];
};

const getLanguageFirstPart = langCode => {
  
    if (typeof langCode !== "string")
      throw new Error(
        `Error at getLanguageFirstPart::  invalid parameter langCode ${langCode}`
      );
  

    return langCode.substring(0,2).toLowerCase();
  };

const getFlagCode = languageCode => {

    const langRegex = /^[a-z]{2}-[A-Z]{2}$/;
    
    const supportedFlagCodes = Object.values(supportedLanguages).map(langInfo => {

        const {code} = langInfo;
        return code.substring(code.length-2);
    }).join(", ");

    if(!langRegex.test(languageCode))
        throw new Error(
        `Error at getFlagCode::  invalid parameter langCode. Select one of ${supportedFlagCodes}`
    );

    const flagCode = languageCode.substring(languageCode.length-2).toUpperCase();

    console.log("FLAGcode!", flagCode);
    return flagCode;
}

export { getLanguageInfo, getFlagCode, getLanguageFirstPart }
export default supportedLanguages;
