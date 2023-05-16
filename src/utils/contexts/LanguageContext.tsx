import {createContext, ReactElement, useState} from "react";

export const enum LanguageEnum {
    DE = "de",
    EN = "en",
}

type LanguageContextProps = {
    language: LanguageEnum;
    changeLanguage: (lang: LanguageEnum) => void;
};

const languageContext = createContext<LanguageContextProps>({} as LanguageContextProps);

export function LanguageProvider(props: { children: ReactElement | ReactElement[] }) {
    const [language, setLanguage] = useState<LanguageEnum>(LanguageEnum.DE);

    function changeLanguage(value: LanguageEnum) {
        setLanguage(value);
    }

    return <languageContext.Provider value={{ language, changeLanguage }}>{props.children}</languageContext.Provider>;
}

export default languageContext;
