import { TableColumn } from "react-data-table-component";
import { NotificationModel } from "@/models/NotificationModel";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { Button } from "@/components/ui/Button/Button";
import { TbEye, TbEyeOff, TbTrash } from "react-icons/tb";
import NotificationHelper from "@/utils/helper/NotificationHelper";
import { LanguageEnum } from "@/utils/contexts/LanguageContext";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import {Dispatch, useState} from "react";
import UserNotificationService from "@/services/user/UserNotificationService";
import ToastHelper from "@/utils/helper/ToastHelper";

function getColumns(notifications: NotificationModel[], setNotifications: Dispatch<NotificationModel[]>): TableColumn<NotificationModel>[] {
    const [deletingNotificationID, setDeletingNotificationID] = useState<number | undefined>(undefined);

    function deleteNotification(notificationID: number) {
        setDeletingNotificationID(notificationID);

        UserNotificationService.deleteNotification(notificationID)
            .then(() => {
                const newNotifications = notifications.filter(n => n.id != notificationID);
                setNotifications(newNotifications);
                ToastHelper.success("Benachrichtigung erfolgreich gelöscht");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim löschen der Benachrichtigung");
            })
            .finally(() => setDeletingNotificationID(undefined));
    }

    function toggleRead(notificationID: number) {
        let newNotifications = [...notifications];
        const n = newNotifications.find(n => n.id == notificationID);
        if (n == null) {
            return;
        }

        n.read = !n.read;

        UserNotificationService.toggleRead(notificationID)
            .then(() => {
                setNotifications(newNotifications);
                ToastHelper.success("Benachrichtigung erfolgreich aktualisiert");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim aktualisieren der Benachrichtigung");
            })
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
                            disabled={deletingNotificationID != null}
                            icon={row.read ? <TbEyeOff size={20} /> : <TbEye size={20} />}
                            onClick={() => toggleRead(row.id)}
                            size={SIZE_OPTS.SM}></Button>
                        <Button
                            color={COLOR_OPTS.DANGER}
                            className={"ml-2"}
                            loading={deletingNotificationID == row.id}
                            disabled={deletingNotificationID != null}
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
