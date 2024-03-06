import { setColorScheme, TColorScheme } from "@/app/features/settingsSlice";
import { store } from "@/app/store";

const LOCAL_STORAGE_KEY: string = "vatger_tc_theme";

/**
 * Gets an item specified by the key from localStorage
 * @param key
 */
function _getItem(key: string) {
    return window.localStorage.getItem(key);
}

/**
 * Gets Returns the color scheme stored in local storage or the OS default
 * @return "dark" or "light" depending on local storage and OS default
 */
function getColorTheme(): TColorScheme {
    // Local Storage
    const lsDarkMode = _getItem(LOCAL_STORAGE_KEY);
    // OS
    const osDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    let theme = "light";
    // Check local storage if user isn't logged in for example
    switch (lsDarkMode) {
        case "auto":
        default:
            // If the localstorage is set to auto, we can continue with the OS theme
            if (osDarkMode) {
                store.dispatch(setColorScheme("dark"));
                theme = "dark";
            } else {
                store.dispatch(setColorScheme("light"));
                theme = "light";
            }
            break;

        case "dark":
            store.dispatch(setColorScheme("dark"));
            theme = "dark";
            break;

        case "light":
            store.dispatch(setColorScheme("light"));
            theme = "light";
            break;
    }

    return theme as TColorScheme;
}

/**
 * Sets the color scheme
 * @param value
 */
function setColorTheme(value: TColorScheme) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, value);
    updateColorScheme();
}

/**
 * Updates the color scheme
 */
function updateColorScheme() {
    const theme = getColorTheme();

    const html = document.getElementById("dark-mode-selector");
    if (theme == "dark") {
        html?.setAttribute("data-mode", "dark");
        document.querySelector("meta[name=theme-color]")?.setAttribute("content", "#202938");
    } else {
        html?.removeAttribute("data-mode");
        document.querySelector("meta[name=theme-color]")?.setAttribute("content", "#ffffff");
    }
}

export default {
    updateColorScheme,
    getColorTheme,
    setColorTheme,
};
