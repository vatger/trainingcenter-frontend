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

    APP_HOST: "http://localhost:8000",
    API_BASE_URL: "http://localhost:8001",
    DATE_FORMAT: "DD.MM.YYYY",
    DATETIME_FORMAT: "DD.MM.YYYY HH:mmz",
};
