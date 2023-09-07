import UserService from "@/services/user/UserService";
import UserNotificationService from "@/services/user/UserNotificationService";
import { Table } from "@/components/ui/Table/Table";
import MANotificationListTypes from "@/pages/authenticated/account/manage-account/_types/MANotificationList.types";
import useApi from "@/utils/hooks/useApi";
import {NotificationModel} from "@/models/NotificationModel";

export function MANotificationsPartial() {
    const {data: notifications, setData: setNotifications, loading} = useApi<NotificationModel[]>({
        url: "/notification",
        method: "get"
    });

    return (
        <>
            <Table columns={MANotificationListTypes.getColumns(notifications ?? [], setNotifications)} paginate loading={loading} data={notifications ?? []} />
        </>
    );
}
