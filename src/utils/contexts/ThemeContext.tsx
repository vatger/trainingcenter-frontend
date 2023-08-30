import { createContext, ReactElement, useEffect, useState } from "react";

type DarkModeContextProps = {
    darkMode: boolean;
    changeDarkMode: (value: "auto" | "dark" | "light") => void;
    themeString: string;
};

const themeContext = createContext<DarkModeContextProps>({} as DarkModeContextProps);
const localStorageKey = "vatger_tc_theme";

function getOsTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getDarkModeState(): boolean {
    // Local Storage
    const lsDarkMode = window.localStorage.getItem(localStorageKey);
    // OS
    const osDarkMode = getOsTheme();

    // Check local storage if user isn't logged in for example
    if (lsDarkMode != null) {
        switch (lsDarkMode) {
            case "auto":
                // If the localstorage is set to auto, we can continue with the OS theme
                break;

            case "dark":
                return true;

            case "light":
                return false;
        }
    }

    return osDarkMode;
}

export function DarkModeProvider(props: { children: ReactElement | ReactElement[] }) {
    const [darkMode, setDarkMode] = useState<boolean>(getDarkModeState());
    const [themeString, setThemeString] = useState<string>(window.localStorage.getItem(localStorageKey) ?? "auto");

    useEffect(() => {
        if (darkMode) {
            const html = document.getElementById("dark-mode-selector");
            if (html == null) return;
            html.setAttribute("data-mode", "dark");
        }
    }, []);

    /**
     * Utility function to set the dark mode from a boolean value (as opposed to the usual string representation of auto, light, dark)
     * @param enabled
     */
    function setDarkModeFromBool(enabled: boolean) {
        setDarkMode(enabled);

        const html = document.getElementById("dark-mode-selector");
        if (html == null) return;

        if (enabled) {
            html.setAttribute("data-mode", "dark");
            document.querySelector("meta[name=theme-color]")?.setAttribute("content", "#202938");
            return;
        }

        document.querySelector("meta[name=theme-color]")?.setAttribute("content", "#ffffff");
        html.removeAttribute("data-mode");
    }

    function changeDarkMode(value: "auto" | "dark" | "light") {
        if (!["auto", "dark", "light"].includes(value)) {
            return;
        }

        setThemeString(value);

        const osDarkTheme = getOsTheme();
        if ((value == "auto" && osDarkTheme) || value == "dark") {
            setDarkModeFromBool(true);
        } else if ((value == "auto" && !osDarkTheme) || value == "light") {
            setDarkModeFromBool(false);
        }

        window.localStorage.setItem(localStorageKey, value);
    }

    return (
        <>
            <themeContext.Provider value={{ darkMode, changeDarkMode, themeString }}>{props.children}</themeContext.Provider>
        </>
    );
}

export default themeContext;
