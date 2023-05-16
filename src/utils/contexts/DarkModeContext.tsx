import {createContext, ReactElement, useContext, useEffect, useState} from "react";
import authContext from "./AuthContext";
import {UserSettingsModel} from "../../models/User.model";

type DarkModeContextProps = {
    darkMode: boolean;
    changeDarkMode: (value: boolean) => void;
};

const darkModeContext = createContext<DarkModeContextProps>({} as DarkModeContextProps);

function getDarkModeState(userSettings?: UserSettingsModel): boolean {
    // User
    const userDarkMode = userSettings?.dark_mode;
    // Local Storage
    const lsDarkMode = window.localStorage.getItem("vatger_tc_dark");
    // OS
    const osDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Check the user's preferences
    if (userDarkMode != null) {
        return userDarkMode;
    }

    // Check local storage if user isn't logged in for example
    if (localStorage != null) {
        return lsDarkMode == "true";
    }

    return osDarkMode;
}

export function DarkModeProvider(props: { children: ReactElement | ReactElement[] }) {
    const { userSettings } = useContext(authContext);
    const [darkMode, setDarkMode] = useState<boolean>(getDarkModeState(userSettings));

    useEffect(() => {
        if (darkMode) {
            const html = document.getElementById("dark-mode-selector");
            if (html == null) return;
            html.setAttribute("data-mode", "dark");

            window.localStorage.setItem("vatger_tc_dark", "true");
        } else {
            window.localStorage.setItem("vatger_tc_dark", "false");
        }
    }, []);

    useEffect(() => {
        // Update the dark mode state if there is a change to the user model (i.e. settings have changed, etc.)
        changeDarkMode(getDarkModeState(userSettings));
    }, [userSettings]);

    function changeDarkMode(value: boolean) {
        setDarkMode(value);

        const html = document.getElementById("dark-mode-selector");
        if (html == null) return;

        if (value) {
            html.setAttribute("data-mode", "dark");
            window.localStorage.setItem("vatger_tc_dark", "true");
        } else {
            html.removeAttribute("data-mode");
            window.localStorage.setItem("vatger_tc_dark", "false");
        }
    }

    return (
        <>
            <darkModeContext.Provider value={{ darkMode, changeDarkMode }}>{props.children}</darkModeContext.Provider>
        </>
    );
}

export default darkModeContext;
