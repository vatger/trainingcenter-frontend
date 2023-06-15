import { createContext, ReactElement, useState } from "react";
import dayjs from "dayjs";

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
        if (value == LanguageEnum.DE) {
            dayjs.locale("de");
        } else {
            dayjs.locale("en");
        }
        setLanguage(value);
    }

    return <languageContext.Provider value={{ language, changeLanguage }}>{props.children}</languageContext.Provider>;
}

export default languageContext;
