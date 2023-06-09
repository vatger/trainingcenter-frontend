import { TbBell, TbClipboardList, TbMailOpened } from "react-icons/all";
import { Dispatch, useContext, useEffect, useRef, useState } from "react";
import { generateUUID } from "../../../utils/helper/UUIDHelper";
import { NotificationModel } from "../../../models/NotificationModel";
import UserNotificationService from "../../../services/user/UserNotificationService";
import authContext from "../../../utils/contexts/AuthContext";
import { Axios, AxiosError } from "axios";
import { MapArray } from "../../conditionals/MapArray";
import { convertNotificationContent, getIconByString, getIconColorBySeverity } from "../../../utils/helper/NotificationHelper";
import dayjs from "dayjs";
import languageContext from "../../../utils/contexts/LanguageContext";
import { Tooltip } from "../../ui/Tooltip/Tooltip";
import { RenderIf } from "../../conditionals/RenderIf";
import ToastHelper from "../../../utils/helper/ToastHelper";

function loadNotifications(setNotifications: Dispatch<NotificationModel[]>, user_id?: number) {
    if (user_id == null) return;

    UserNotificationService.getUnreadNotifications(user_id)
        .then((notifications: NotificationModel[]) => {
            setNotifications(notifications);
        })
        .catch((err: AxiosError) => {
            console.log("Error");
        });
}

export function NotificationHeader() {
    const selectNotificationUUID = useRef(generateUUID());
    const { user } = useContext(authContext);
    const { language } = useContext(languageContext);
    const [notificationMenuHidden, setNotificationMenuHidden] = useState<boolean>(true);

    const [notifications, setNotifications] = useState<NotificationModel[]>([]);

    useEffect(() => {
        document.addEventListener("mousedown", e => {
            if (e.button !== 0) return;

            const click_div = document.getElementById(`dropdown-toggle-${selectNotificationUUID.current}`);
            const dropdown = document.getElementById(`dropdown-${selectNotificationUUID.current}`);
            if (dropdown == null || click_div == null) return;

            if (notificationMenuHidden && !dropdown.contains(e.target as Node) && !click_div.contains(e.target as Node)) {
                dropdown.classList.add("hidden");
                dropdown.classList.remove("dropdown-expand");
                setNotificationMenuHidden(true);
            } else if (notificationMenuHidden) {
                dropdown.classList.remove("hidden");
                dropdown.classList.add("dropdown-expand");

                setTimeout(() => {
                    setNotificationMenuHidden(false);
                }, 150);
            }
        });
        return document.removeEventListener("mousedown", e => {
            if (e.button !== 0) return;

            const click_div = document.getElementById(`dropdown-toggle-${selectNotificationUUID.current}`);
            const dropdown = document.getElementById(`dropdown-${selectNotificationUUID.current}`);
            if (dropdown == null || click_div == null) return;

            if (notificationMenuHidden && !dropdown.contains(e.target as Node) && !click_div.contains(e.target as Node)) {
                dropdown.classList.add("hidden");
                dropdown.classList.remove("dropdown-expand");
                setNotificationMenuHidden(true);
            } else if (notificationMenuHidden) {
                dropdown.classList.remove("hidden");
                dropdown.classList.add("dropdown-expand");

                setTimeout(() => {
                    setNotificationMenuHidden(false);
                }, 150);
            }
        });
    }, []);

    useEffect(() => {
        loadNotifications(setNotifications, user?.id);

        setInterval(() => {
            loadNotifications(setNotifications, user?.id);
        }, 1000 * 60 * 5);
    }, []);

    function markAllAsRead() {
        if (notifications.length == 0) return;

        setNotifications([]);
        ToastHelper.success("Notifications marked as read");
    }

    return (
        <div>
            <div className="dropdown">
                <div className="dropdown-toggle" onClick={() => setNotificationMenuHidden(false)} id={`dropdown-toggle-${selectNotificationUUID.current}`}>
                    <div className="header-action-item header-action-item-hoverable flex items-center">
                        <TbBell size={20} />
                        <RenderIf
                            truthValue={notifications.length > 0}
                            elementTrue={<div className={"rounded-full w-[8px] h-[8px] bg-red-500 absolute top-[7px]"} />}
                        />
                    </div>
                </div>

                {/* Dropdown */}
                <ul
                    id={`dropdown-${selectNotificationUUID.current}`}
                    className="dropdown-menu bottom-end p-0 min-w-[300px] md:min-w-[340px] opacity-100 right-[-50px] sm:right-0 sm:right-0 hidden">
                    <li className="menu-item-header">
                        <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
                            <h6>Notifications ({notifications.length})</h6>
                            <span className="tooltip-wrapper">
                                <Tooltip content={"Mark all as read"}>
                                    <button
                                        onClick={() => markAllAsRead()}
                                        className="button bg-transparent border border-transparent hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-circle h-9 w-9 inline-flex items-center justify-center text-lg">
                                        <TbMailOpened size={20} />
                                    </button>
                                </Tooltip>
                            </span>
                        </div>
                    </li>
                    <div className="overflow-y-auto side-nav-hide-scrollbar h-52">
                        <div className={"relative w-full h-full"}>
                            <div className={"absolute inset-0 overflow-y-auto side-nav-hide-scrollbar mr-0 mb-0"}>
                                <MapArray
                                    data={notifications}
                                    mapFunction={(n: NotificationModel, index: number) => {
                                        return (
                                            <div
                                                key={index}
                                                className="relative flex px-4 py-2 cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-20 border-b border-gray-200 dark:border-gray-600">
                                                <div>
                                                    <span
                                                        className={`avatar avatar-circle avatar-md flex justify-center ${getIconColorBySeverity(n.severity)}`}>
                                                        {getIconByString(20, n.icon, "m-auto")}
                                                    </span>
                                                </div>
                                                <div className="ml-3">
                                                    <div>
                                                        <span dangerouslySetInnerHTML={{ __html: convertNotificationContent(n, language) }}></span>
                                                    </div>
                                                    <span className="text-xs">{dayjs(n.createdAt).fromNow()}</span>
                                                </div>
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <li id="menu-item-16-4uY6FZ7s9M" className="menu-item-header">
                        <div className="flex justify-center border-t border-gray-200 dark:border-gray-600 px-4 py-2">
                            <a
                                className="font-semibold cursor-pointer p-2 px-3 text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                                href="/app/account/activity-log">
                                View All Activity
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
