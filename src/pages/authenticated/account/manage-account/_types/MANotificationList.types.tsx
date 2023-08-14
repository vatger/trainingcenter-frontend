import { TableColumn } from "react-data-table-component";
import { NotificationModel } from "@/models/NotificationModel";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { Button } from "@/components/ui/Button/Button";
import { TbEye, TbEyeOff, TbTrash } from "react-icons/all";
import NotificationHelper from "@/utils/helper/NotificationHelper";
import { LanguageEnum } from "@/utils/contexts/LanguageContext";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { Dispatch } from "react";

function getColumns(notifications: NotificationModel[], setNotifications: Dispatch<NotificationModel[]>): TableColumn<NotificationModel>[] {
    function deleteNotification(notificationID: number) {
        const newNotifications = notifications.filter(n => n.id != notificationID);
        setNotifications(newNotifications);
    }

    function toggleRead(notificationID: number) {
        let newNotifications = [...notifications];
        const n = newNotifications.find(n => n.id == notificationID);
        if (n == null) {
            return;
        }

        n.read = !n.read;

        setNotifications(newNotifications);
    }

    return [
        {
            name: "Ungelesen",
            cell: row => {
                if (!row.read) {
                    return <Badge color={COLOR_OPTS.DANGER}>Ungelesen</Badge>;
                }

                return <Badge color={COLOR_OPTS.DEFAULT}>Gelesen</Badge>;
            },
            sortable: true,
            sortFunction: (a, b) => (a.read && !b.read ? 1 : -1),
        },
        {
            name: "Inhalt",
            cell: row => <span dangerouslySetInnerHTML={{ __html: NotificationHelper.convertNotificationContent(row, LanguageEnum.DE) }}></span>,
        },
        {
            name: "Erstellt Am (UTC)",
            cell: row => dayjs(row.createdAt).format(Config.DATETIME_FORMAT),
            sortable: true,
            sortFunction: (a, b) => {
                if (a.createdAt == null || b.createdAt == null) {
                    return 0;
                }

                return a.createdAt > b.createdAt ? 1 : -1;
            },
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <div className={"flex"}>
                        <Button
                            color={COLOR_OPTS.PRIMARY}
                            variant={"twoTone"}
                            icon={row.read ? <TbEyeOff size={20} /> : <TbEye size={20} />}
                            onClick={() => toggleRead(row.id)}
                            size={SIZE_OPTS.SM}></Button>
                        <Button
                            color={COLOR_OPTS.DANGER}
                            className={"ml-2"}
                            variant={"twoTone"}
                            icon={<TbTrash size={20} />}
                            size={SIZE_OPTS.SM}
                            onClick={() => deleteNotification(row.id)}></Button>
                    </div>
                );
            },
        },
    ];
}

export default {
    getColumns,
};
