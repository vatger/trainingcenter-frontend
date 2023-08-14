import UserService from "@/services/user/UserService";
import UserNotificationService from "@/services/user/UserNotificationService";
import { Table } from "@/components/ui/Table/Table";
import MANotificationListTypes from "@/pages/authenticated/account/manage-account/_types/MANotificationList.types";

export function MANotificationsPartial() {
    const { notifications, setNotifications, loading } = UserNotificationService.getAllNotifications();

    return (
        <>
            <Table columns={MANotificationListTypes.getColumns(notifications, setNotifications)} paginate loading={loading} data={notifications} />
        </>
    );
}
