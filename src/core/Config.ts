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

    APP_HOST: import.meta.env.VITE_APP_HOST,
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    DATE_FORMAT: "DD.MM.YYYY",
    DATETIME_FORMAT: "DD.MM.YYYY HH:mmz",
};
