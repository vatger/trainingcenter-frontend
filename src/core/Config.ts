import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import "dayjs/locale/de";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(duration);

export const Config = {
    VERSION: "0.0.1-Beta",
    VATGER_BROWSER_TOKEN_NAME: "vatger_tc_browser_token",

    APP_HOST: import.meta.env.ENV == "production" ? "https://api.tc.vatsim-germany.org" : "http://localhost:8000",
    API_BASE_URL: import.meta.env.ENV == "production" ? "https://tc.vatsim-germany.org" : "http://localhost:8001",
    DATE_FORMAT: "DD.MM.YYYY",
    DATETIME_FORMAT: "DD.MM.YYYY HH:mm",

    SHOW_SUCCESS_TIMEOUT: 1500,

    VACC_LOGO_WHITE: "https://cdn.vatsim-germany.org/img/vacc_logo_white.png",
    VACC_LOGO_COLOR: "https://cdn.vatsim-germany.org/img/vacc_logo_color.png"
};

export const CommonConstants = {
    CID_MAX_LEN: 8, // It's actually 7, but auth-dev accounts have (for some wierd reason) 8 numbers.
};

export const CommonRegexp = {
    CID: RegExp("^[0-9]{6,8}$"),
    NOT_EMPTY: RegExp("^(?!\\s*$).+"),
    CALLSIGN: RegExp("^([A-z]{3,4}_[A-z0-9]{1,3}_[A-z]{3})|([A-z]{3,4}_[A-z]{3})$"),
};
