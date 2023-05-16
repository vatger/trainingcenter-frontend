import {TbBell, TbClipboardList, TbMailOpened} from "react-icons/all";
import {useEffect, useRef, useState} from "react";
import {generateUUID} from "../../../utils/helper/UUIDHelper";

export function NotificationHeader() {
    const selectNotificationUUID = useRef(generateUUID());
    const [notificationMenuHidden, setNotificationMenuHidden] = useState<boolean>(true);

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
    });

    return (
        <div>
            <div className="dropdown">
                <div className="dropdown-toggle" onClick={() => setNotificationMenuHidden(false)} id={`dropdown-toggle-${selectNotificationUUID.current}`}>
                    <div className="header-action-item header-action-item-hoverable flex items-center">
                        <TbBell size={20} />
                        <div className={"rounded-full w-[8px] h-[8px] bg-red-500 absolute top-[7px]"} />
                    </div>
                </div>

                {/* Dropdown */}
                <ul
                    id={`dropdown-${selectNotificationUUID.current}`}
                    className="dropdown-menu bottom-end p-0 min-w-[300px] md:min-w-[340px] opacity-100 right-[-50px] sm:right-0 sm:right-0 hidden">
                    <li className="menu-item-header">
                        <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
                            <h6>Notifications</h6>
                            <span className="tooltip-wrapper">
                                <button className="button bg-transparent border border-transparent hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-circle h-9 w-9 inline-flex items-center justify-center text-lg">
                                    <TbMailOpened size={20} />
                                </button>
                            </span>
                        </div>
                    </li>
                    <div className="overflow-y-auto side-nav-hide-scrollbar h-52">
                        <div className={"relative w-full h-full"}>
                            <div className={"absolute inset-0 overflow-y-auto side-nav-hide-scrollbar mr-0 mb-0"}>
                                <div className="relative flex px-4 py-2 cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-20 border-b border-gray-200 dark:border-gray-600">
                                    <div>
                                        <span className="avatar avatar-circle avatar-md bg-indigo-500 dark:bg-indigo-600 flex justify-center">
                                            <TbClipboardList className={"m-auto"} size={20} />
                                        </span>
                                    </div>
                                    <div className="ml-3">
                                        <div>
                                            <span className="font-semibold heading-text">Felix Soest </span>
                                            <span>created a new training log entry. Click here to view.</span>
                                        </div>
                                        <span className="text-xs">20 minutes ago</span>
                                    </div>
                                </div>
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
