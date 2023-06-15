import { TbActivityHeartbeat, TbLogout, TbSettings, TbUser } from "react-icons/all";
import { MenuItem } from "../../ui/MenuItem/MenuItem";
import { useContext, useEffect, useRef, useState } from "react";
import { generateUUID } from "../../../utils/helper/UUIDHelper";

import "./GenericHeaderAnimation.scss";
import authContext from "../../../utils/contexts/AuthContext";
import { axiosInstance } from "../../../utils/network/AxiosInstance";
import { Spinner } from "../../ui/Spinner/Spinner";

export function UserProfileHeader() {
    const { user } = useContext(authContext);

    const profileMenuUUID = useRef(generateUUID());
    const [profileMenuHidden, setProfileMenuHidden] = useState<boolean>(true);
    const [loggingOut, setLoggingOut] = useState<boolean>(false);

    function handleLogout() {
        setLoggingOut(true);

        axiosInstance
            .post("/auth/logout")
            .then(res => {
                if (res.data.success) {
                    window.location.replace("/login?logout");
                }
            })
            .catch(() => {
                setLoggingOut(false);
            });
    }

    useEffect(() => {
        document.addEventListener("mousedown", e => {
            if (e.button !== 0) return;

            const click_div = document.getElementById(`dropdown-toggle-${profileMenuUUID.current}`);
            const dropdown = document.getElementById(`dropdown-${profileMenuUUID.current}`);
            if (dropdown == null || click_div == null) return;

            if (profileMenuHidden && !dropdown.contains(e.target as Node) && !click_div.contains(e.target as Node)) {
                dropdown.classList.add("hidden");
                dropdown.classList.remove("dropdown-expand");
                setProfileMenuHidden(true);
            } else if (profileMenuHidden) {
                dropdown.classList.remove("hidden");
                dropdown.classList.add("dropdown-expand");

                setTimeout(() => {
                    setProfileMenuHidden(false);
                }, 150);
            }
        });

        return document.removeEventListener("mousedown", e => {
            if (e.button !== 0) return;

            const click_div = document.getElementById(`dropdown-toggle-${profileMenuUUID.current}`);
            const dropdown = document.getElementById(`dropdown-${profileMenuUUID.current}`);
            if (dropdown == null || click_div == null) return;

            if (profileMenuHidden && !dropdown.contains(e.target as Node) && !click_div.contains(e.target as Node)) {
                dropdown.classList.add("hidden");
                dropdown.classList.remove("dropdown-expand");
                setProfileMenuHidden(true);
            } else if (profileMenuHidden) {
                dropdown.classList.remove("hidden");
                dropdown.classList.add("dropdown-expand");

                setTimeout(() => {
                    setProfileMenuHidden(false);
                }, 150);
            }
        });
    }, []);

    return (
        <div>
            <div className="dropdown">
                <div className="dropdown-toggle" onClick={() => setProfileMenuHidden(false)} id={`dropdown-toggle-${profileMenuUUID.current}`}>
                    <div className="header-action-item flex header-action-item-hoverable md:rounded-md items-center gap-2">
                        <div className={"header-action-item p-0 m-0 md:mr-2 mr-0"}>
                            <TbUser size={20} />
                        </div>
                        <div className="hidden md:block mr-1">
                            <div className="text-xs capitalize">admin</div>
                            <div className="font-bold">{user?.first_name + " " + user?.last_name}</div>
                        </div>
                    </div>
                </div>

                {/* Dropdown */}
                <ul id={`dropdown-${profileMenuUUID.current}`} className={"dropdown-menu bottom-end right-[-6px] sm:right-0 min-w-[220px] hidden"}>
                    <li className="menu-item-header">
                        <div className="py-2 px-3 flex items-center gap-2">
                            <div>
                                <div className="font-bold text-gray-900 dark:text-gray-100">{user?.first_name + " " + user?.last_name}</div>
                                <div className="text-xs">{user?.email}</div>
                            </div>
                        </div>
                    </li>
                    <li id="menu-item-16-GcfayYzLSI" className="menu-item-divider"></li>
                    <MenuItem href={"account/manage#profile"} icon={<TbUser size={20} />}>
                        Profile
                    </MenuItem>
                    <MenuItem href={"account/manage#settings"} icon={<TbSettings size={20} />}>
                        Settings
                    </MenuItem>
                    <MenuItem icon={<TbActivityHeartbeat size={20} />}>Activity</MenuItem>
                    <li id="menu-item-16-GcfayYzLSI" className="menu-item-divider"></li>
                    <MenuItem
                        disabled={loggingOut}
                        onClick={() => handleLogout()}
                        isNoLink
                        className={"text-danger"}
                        icon={loggingOut ? <Spinner size={20} className={"my-auto"} borderWidth={2} color={"rgb(239 68 68)"} /> : <TbLogout size={20} />}>
                        {loggingOut ? "Logging Out" : "Logout"}
                    </MenuItem>
                </ul>
            </div>
        </div>
    );
}
