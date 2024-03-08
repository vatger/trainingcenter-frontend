import vaccLogo from "../../assets/img/vacc_logo.png";
import vaccLogoDark from "../../assets/img/vacc_logo_dark.png";

import React, { useContext, useEffect } from "react";
import { MenuItem } from "../ui/MenuItem/MenuItem";
import {
    TbAdjustments,
    TbBooks,
    TbCalendar,
    TbCalendarEvent,
    TbCalendarPlus,
    TbCalendarStats,
    TbCertificate,
    TbCheckupList,
    TbChevronsRight,
    TbClipboardList,
    TbClipboardText,
    TbClock,
    TbDashboard,
    TbFilePlus,
    TbInbox,
    TbList,
    TbListDetails,
    TbLock,
    TbRss,
    TbSearch,
    TbSettings,
    TbSquareCheck,
    TbTemplate,
    TbUsers,
    TbX,
} from "react-icons/tb";
import { CollapsableMenu } from "./sidenav/CollapsableMenu";
import { sideNavMenuContext } from "@/utils/contexts/SideNavMenuContext";
import { handleResize } from "./sidenav/SideNav.helper";
import { RenderIf } from "../conditionals/RenderIf";
import { SIDENAV_WIDTH } from "@/assets/theme.config";
import { useAuthSelector } from "@/app/features/authSlice";
import { useSettingsSelector } from "@/app/features/settingsSlice";

export function SideNav() {
    const userPermissions = useAuthSelector().userPermissions;
    const { menuExtended, toggleMenuExtended } = useContext(sideNavMenuContext);
    const theme = useSettingsSelector().colorScheme;

    function toggleMobileNav() {
        const backdrop = document.getElementById("backdrop-small-nav");
        const menu = document.getElementById("nav-container");
        if (backdrop != null) {
            backdrop.style.opacity = "0";
        }
        if (menu != null) {
            menu.style.marginLeft = `-${SIDENAV_WIDTH}px`;
        }

        setTimeout(() => {
            toggleMenuExtended();
        }, 150);
    }

    useEffect(() => {
        let resizeEventId: NodeJS.Timeout;
        let prevWidth = window.innerWidth;

        window.addEventListener("resize", () => {
            clearTimeout(resizeEventId);
            resizeEventId = setTimeout(() => {
                handleResize(prevWidth, toggleMenuExtended);
                prevWidth = window.innerWidth;
            }, 50);
        });

        return window.removeEventListener("resize", () => {
            console.log("r");
            clearTimeout(resizeEventId);
            resizeEventId = setTimeout(() => {
                handleResize(prevWidth, toggleMenuExtended);
                prevWidth = window.innerWidth;
            }, 50);
        });
    });

    return (
        <>
            <div
                id={"nav-container"}
                style={{ width: "290px", minWidth: "290px", marginLeft: menuExtended ? "" : `-${SIDENAV_WIDTH}px` }}
                className={
                    "side-nav border-r border-gray-200 dark:border-gray-700 flex absolute top-0 left-0 h-[100svh] min-h-[100svh] max-h-[100svh] sm:relative z-[99] dark:bg-gray-800 bg-white overflow-y-hidden"
                }>
                <div className={"side-nav-header flex justify-center"}>
                    <div className={"logo px-6 pt-5 mx-auto"} style={{ width: "auto", maxWidth: "80%" }}>
                        <a target={"_blank"} href={"https://vatsim-germany.org"}>
                            <img
                                className={"sm:w-auto w-[20px]"}
                                style={{ width: "auto" }}
                                src={theme == "dark" ? vaccLogoDark : vaccLogo}
                                alt={"VATGER Logo"}
                            />
                        </a>
                    </div>
                    <div onClick={toggleMobileNav} className="sm:hidden block header-action-item header-action-item-hoverable text-2xl m-auto mt-4">
                        <TbX size={20} />
                    </div>
                </div>
                <div className={"side-nav-content mt-4"}>
                    <div style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%" }}>
                        <div className={"absolute inset-0 overflow-y-auto mr-0 mb-0 pb-10 side-nav-hide-scrollbar"}>
                            <nav className="menu menu-transparent px-4 pt-5">
                                <MenuItem icon={<TbDashboard size={20} />} href={"overview"}>
                                    Dashboard
                                </MenuItem>

                                <div className="menu-group">
                                    <div className="menu-title menu-title-transparent">Ausbildung</div>

                                    <CollapsableMenu title={"Kurse"} icon={<TbBooks size={20} />}>
                                        <MenuItem href={"course"} icon={<TbSearch size={20} />}>
                                            {"Suchen"}
                                        </MenuItem>
                                        <MenuItem href={"course/active"} icon={<TbListDetails size={20} />}>
                                            {"Aktiv"}
                                        </MenuItem>
                                        <MenuItem href={"course/completed"} icon={<TbCheckupList size={20} />}>
                                            {"Abgeschlossen"}
                                        </MenuItem>
                                    </CollapsableMenu>

                                    <CollapsableMenu title={"Trainings"} icon={<TbCalendarEvent size={20} />}>
                                        <MenuItem href={"training/request/open"} icon={<TbClock size={20} />}>
                                            Offene Trainingsanfragen
                                        </MenuItem>
                                        <MenuItem href={"training/planned"} icon={<TbCalendarStats size={20} />}>
                                            Geplante Trainings
                                        </MenuItem>
                                        <MenuItem href={"training/completed"} icon={<TbList size={20} />}>
                                            Abgeschlossene Trainings
                                        </MenuItem>
                                    </CollapsableMenu>
                                </div>

                                <RenderIf
                                    truthValue={userPermissions.indexOf("mentor.view".toUpperCase()) != -1}
                                    elementTrue={
                                        <>
                                            <div className="menu-title menu-title-transparent">Mentoren</div>
                                            <CollapsableMenu title={"Mitglieder"} icon={<TbUsers size={20} />}>
                                                <MenuItem href={"administration/users/list"} icon={<TbSearch size={20} />}>
                                                    Mitglied Suchen
                                                </MenuItem>
                                                <MenuItem icon={<TbList size={20} />}>Übersicht Trainees</MenuItem>
                                            </CollapsableMenu>

                                            <CollapsableMenu title={"Trainings"} icon={<TbCalendar size={20} />}>
                                                <MenuItem href={"administration/training-request/open"} icon={<TbInbox size={20} />}>
                                                    Offene Trainingsanfragen
                                                </MenuItem>
                                                <MenuItem href={"administration/training-session/create"} icon={<TbCalendarPlus size={20} />}>
                                                    Training Erstellen
                                                </MenuItem>
                                                <MenuItem href={"administration/training-request/planned"} icon={<TbCalendarStats size={20} />}>
                                                    Geplante Trainings
                                                </MenuItem>
                                                <MenuItem icon={<TbList size={20} />}>Meine Trainings</MenuItem>
                                            </CollapsableMenu>

                                            <CollapsableMenu title={"CPTs"} icon={<TbCertificate size={20} />}>
                                                <MenuItem href={"/administration/cpt/create"} icon={<TbInbox size={20} />}>
                                                    CPT Erstellen
                                                </MenuItem>
                                                <MenuItem href={"/administration/cpt/open"} icon={<TbCalendarEvent size={20} />}>
                                                    CPT Übersicht
                                                </MenuItem>
                                            </CollapsableMenu>
                                        </>
                                    }
                                />

                                <RenderIf
                                    truthValue={userPermissions.indexOf("lm.view".toUpperCase()) != -1}
                                    elementTrue={
                                        <>
                                            <div className="menu-title menu-title-transparent">LM</div>
                                            <MenuItem href={"administration/endorsement-group"} icon={<TbCertificate size={20} />}>
                                                Freigabegruppen
                                            </MenuItem>
                                            <MenuItem href={"administration/mentor-group"} icon={<TbUsers size={20} />}>
                                                Mentorgruppen
                                            </MenuItem>
                                            <MenuItem href={"administration/course"} icon={<TbClipboardList size={20} />}>
                                                Kurse
                                            </MenuItem>
                                            <MenuItem href={"administration/training-type"} icon={<TbTemplate size={20} />}>
                                                Trainingstypen
                                            </MenuItem>
                                            <MenuItem icon={<TbAdjustments size={20} />} href={"administration/action-requirement"}>
                                                Aktionen | Bedingungen
                                            </MenuItem>
                                        </>
                                    }
                                />

                                <RenderIf
                                    truthValue={userPermissions.indexOf("atd.view".toUpperCase()) != -1}
                                    elementTrue={
                                        <>
                                            <div className="menu-title menu-title-transparent">ATD</div>
                                            <CollapsableMenu requiredPerm={"atd.examiner.view"} title={"Prüfer"} icon={<TbUsers size={20} />}>
                                                <MenuItem href={"/administration/atd-examiner/cpt"} icon={<TbClipboardList size={20} />}>
                                                    CPTs
                                                </MenuItem>
                                                <MenuItem href={"/administration/atd-examiner/cpt/available"} icon={<TbCalendar size={20} />}>
                                                    Offene CPTs
                                                </MenuItem>
                                                <MenuItem href={"/administration/atd-examiner/cpt/my"} icon={<TbList size={20} />}>
                                                    Meine CPTs
                                                </MenuItem>
                                            </CollapsableMenu>

                                            <MenuItem href={"administration/log-template"} icon={<TbTemplate size={20} />}>
                                                Logvorlagen
                                            </MenuItem>

                                            <MenuItem
                                                href={"administration/fast-track"}
                                                requiredPerm={"atd.fast_track.view"}
                                                icon={<TbChevronsRight size={20} />}>
                                                Fast-Tracks
                                            </MenuItem>

                                            <MenuItem requiredPerm={"atd.atsim.view"} icon={<TbSquareCheck size={20} />}>
                                                ATSIM Anfragen
                                            </MenuItem>

                                            <MenuItem href={"administration/training-station"} icon={<TbRss size={20} />}>
                                                Trainingsstationen
                                            </MenuItem>
                                        </>
                                    }
                                />

                                <RenderIf
                                    truthValue={userPermissions.indexOf("tech.view".toUpperCase()) != -1}
                                    elementTrue={
                                        <>
                                            <div className="menu-title menu-title-transparent">Administration</div>
                                            <MenuItem requiredPerm={"tech.syslog.view"} href={"administration/syslog"} icon={<TbClipboardText size={20} />}>
                                                Systemlogs
                                            </MenuItem>
                                            <MenuItem requiredPerm={"tech.joblog.view"} href={"administration/joblog"} icon={<TbClipboardText size={20} />}>
                                                Joblogs
                                            </MenuItem>
                                            <MenuItem requiredPerm={"tech.permissions.view"} href={"administration/permission"} icon={<TbLock size={20} />}>
                                                Rechteverwaltung
                                            </MenuItem>
                                            <MenuItem requiredPerm={"tech.appsettings.view"} icon={<TbSettings size={20} />}>
                                                App Einstellungen
                                            </MenuItem>
                                        </>
                                    }
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {menuExtended && (
                <div
                    id={"backdrop-small-nav"}
                    onClick={toggleMobileNav}
                    className={
                        "fixed sm:hidden w-full max-h-[100dvh] h-[100dvh] top-0 left-0 bg-gray-800 transition-opacity opacity-70 z-[98] pointer-events-auto"
                    }
                />
            )}
        </>
    );
}
