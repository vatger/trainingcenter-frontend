import { NotificationModel } from "../../models/NotificationModel";
import { LanguageEnum } from "../contexts/LanguageContext";
import {TbAlertTriangle, TbClipboard, TbDoorExit, TbTrash} from "react-icons/all";

function convertNotificationContent(n: NotificationModel, l: LanguageEnum): string {
    let s = "";
    if (l == LanguageEnum.DE) s = n.content_de;
    else s = n.content_en;

    s = s.replaceAll("$author", `<strong>${n.author?.first_name} ${n.author?.last_name}</strong>`);

    return s;
}

export function getIconByString(size: number, s?: string, className?: string) {
    switch (s?.toLowerCase()) {
        case "trash":
            return <TbTrash className={className} size={size} />;

        case "door-exit":
            return <TbDoorExit className={className} size={size} />;

        case "alert-triangle":
            return <TbAlertTriangle className={className} size={size}/>;

        default:
            return <TbClipboard className={className} size={size} />;
    }
}

export function getIconColorBySeverity(s: "default" | "info" | "success" | "danger") {
    switch (s.toLowerCase()) {
        case "default":
            return "bg-indigo-500 dark:bg-indigo-600";

        case "info":
            return "bg-cyan-500 dark:bg-cyan-600";

        case "success":
            return "bg-emerald-500 dark:bg-emerald-600";

        case "danger":
            return "bg-red-500 dark:bg-red-600";
    }
}

export default {
    convertNotificationContent,
};
