import { NotificationModel } from "../../models/NotificationModel";
import { LanguageEnum } from "../contexts/LanguageContext";

export function convertNotificationContent(n: NotificationModel, l: LanguageEnum): string {
    let s = "";
    if (l == LanguageEnum.DE) s = n.content_de;
    else s = n.content_en;

    s = s.replaceAll("$author", `<strong>${n.author?.first_name} ${n.author?.last_name}</strong>`);

    console.log(s);
    return s;
}
