import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import authContext from "@/utils/contexts/AuthContext";
import { UserSettingsModel } from "@/models/UserModel";

export const enum LanguageEnum {
    DE = "de",
    EN = "en",
}

type LanguageContextProps = {
    language: LanguageEnum;
    changeLanguage: (lang: LanguageEnum) => void;
};

const languageContext = createContext<LanguageContextProps>({} as LanguageContextProps);
const localStorageKey = "vatger_tc_language";

function getLanguageState(userSettings?: UserSettingsModel) {
    const userLanguage = userSettings?.language;

    const lsLanguage = window.localStorage.getItem(localStorageKey);

    if (userLanguage != null) {
        return userLanguage == "de" ? LanguageEnum.DE : LanguageEnum.EN;
    }

    if (lsLanguage != null) {
        return lsLanguage == "de" ? LanguageEnum.DE : LanguageEnum.EN;
    }

    return LanguageEnum.DE;
}

export function LanguageProvider(props: { children: ReactElement | ReactElement[] }) {
    const { userSettings } = useContext(authContext);
    const [language, setLanguage] = useState<LanguageEnum>(getLanguageState(userSettings));

    useEffect(() => {
        if (language == LanguageEnum.DE) {
            window.localStorage.setItem(localStorageKey, "de");
        } else {
            window.localStorage.setItem(localStorageKey, "en");
        }
    }, []);

    useEffect(() => {
        changeLanguage(getLanguageState(userSettings));
    }, [userSettings]);

    function changeLanguage(value: LanguageEnum) {
        if (value == LanguageEnum.DE) {
            dayjs.locale("de");
            window.localStorage.setItem(localStorageKey, "de");
        } else {
            dayjs.locale("en");
            window.localStorage.setItem(localStorageKey, "en");
        }
        setLanguage(value);
    }

    return <languageContext.Provider value={{ language, changeLanguage }}>{props.children}</languageContext.Provider>;
}

export default languageContext;
