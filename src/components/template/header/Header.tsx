import { TbActivityHeartbeat, TbLogout, TbMenu2, TbSettings, TbUser } from "react-icons/all";
import { MenuItem } from "../../ui/MenuItem/MenuItem";
import { useContext, useEffect, useRef, useState } from "react";
import { generateUUID } from "../../../utils/helper/UUIDHelper";
import { sideNavMenuContext } from "../../../utils/contexts/SideNavMenuContext";
import { UserProfileHeader } from "./UserProfileHeader";
import { SelectLanguageHeader } from "./SelectLanguageHeader";
import { NotificationHeader } from "./NotificationHeader";

export function Header() {
    const { menuExtended, toggleMenuExtended } = useContext(sideNavMenuContext);

    return (
        <header className="header border-b border-gray-200 dark:border-gray-700">
            <div className="header-wrapper h-16">
                <div className="header-action header-action-start">
                    <div className="header-action-item header-action-item-hoverable" onClick={() => toggleMenuExtended()}>
                        <div className="text-2xl">
                            <TbMenu2 style={{ transform: menuExtended ? "rotate(0deg)" : "rotate(180deg)" }} size={20} />
                        </div>
                    </div>
                </div>
                <div className="header-action header-action-end">
                    <SelectLanguageHeader />

                    <NotificationHeader />

                    <UserProfileHeader />
                </div>
            </div>
        </header>
    );
}