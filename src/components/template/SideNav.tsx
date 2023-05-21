import vaccLogo from "../../assets/img/vacc_logo.png";
import vaccLogoDark from "../../assets/img/vacc_logo_dark.png";

import React, { useContext, useEffect } from "react";
import { MenuItem } from "../ui/MenuItem/MenuItem";
import {
    TbAdjustments,
    TbBooks,
    TbCalendar,
    TbCalendarEvent,
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
    TbListCheck,
    TbListDetails,
    TbLock,
    TbRss,
    TbSearch,
    TbSettings,
    TbSquareCheck,
    TbTemplate,
    TbUsers,
    TbX,
} from "react-icons/all";
import { CollapsableMenu } from "./sidenav/CollapsableMenu";
import { sideNavMenuContext } from "../../utils/contexts/SideNavMenuContext";
import { handleResize } from "./sidenav/SideNav.helper";
import darkModeContext from "../../utils/contexts/DarkModeContext";
import { RenderIf } from "../conditionals/RenderIf";
import authContext from "../../utils/contexts/AuthContext";
import languageContext from "../../utils/contexts/LanguageContext";
import courseSidenavTranslation from "../../assets/lang/sidenav/courseSidenav.translation";
import { SIDENAV_WIDTH } from "../../assets/theme.config";

export function SideNav() {
    const { userPermissions } = useContext(authContext);
    const { menuExtended, toggleMenuExtended } = useContext(sideNavMenuContext);
    const { darkMode } = useContext(darkModeContext);
    const { language } = useContext(languageContext);

    function toggleMobileNav() {
        const backdrop = document.getElementById("backdrop-small-nav");
        const menu = document.getElementById("nav-container");
        if (backdrop != null) {
            backdrop.style.opacity = "0";
        }
        if (menu != null) {
            menu.style.marginLeft = `-${SIDENAV_WIDTH}`;
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
            {menuExtended && (
                <div
                    id={"backdrop-small-nav"}
                    onClick={() => toggleMobileNav()}
                    className={"fixed sm:hidden w-full h-full top-0 left-0 bg-gray-800 transition-opacity opacity-70 z-[98]"}
                />
            )}
            <div
                id={"nav-container"}
                style={{ width: "290px", minWidth: "290px", marginLeft: menuExtended ? "" : `-${SIDENAV_WIDTH}` }}
                className={"side-nav side-nav-transparent absolute sm:relative z-[99] side-nav-expand dark:bg-gray-800 bg-white max-h-full overflow-y-hidden"}>
                <div className={"side-nav-header flex justify-center"}>
                    <div className={"logo px-6 pt-5 mx-auto"} style={{ width: "auto", maxWidth: "80%" }}>
                        <a target={"_blank"} href={"https://vatsim-germany.org"}>
                            <img className={"sm:w-auto w-[20px]"} style={{ width: "auto" }} src={darkMode ? vaccLogoDark : vaccLogo} alt={"VATGER Logo"} />
                        </a>
                    </div>
                    <div onClick={() => toggleMobileNav()} className="sm:hidden block header-action-item header-action-item-hoverable text-2xl m-auto mt-4">
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

                                    <CollapsableMenu title={courseSidenavTranslation[language].title} icon={<TbBooks size={20} />}>
                                        <MenuItem href={"course/search"} icon={<TbSearch size={20} />}>
                                            {courseSidenavTranslation[language].search}
                                        </MenuItem>
                                        <MenuItem href={"course/active"} icon={<TbListDetails size={20} />}>
                                            {courseSidenavTranslation[language].active}
                                        </MenuItem>
                                        <MenuItem href={"course/completed"} icon={<TbCheckupList size={20} />}>
                                            {courseSidenavTranslation[language].completed}
                                        </MenuItem>
                                    </CollapsableMenu>

                                    <CollapsableMenu title={"Trainings"} icon={<TbCalendarEvent size={20} />}>
                                        <MenuItem href={"training/completed"} icon={<TbList size={20} />}>
                                            Meine Trainings
                                        </MenuItem>
                                        <MenuItem href={"training/planned"} icon={<TbCalendarStats size={20} />}>
                                            Geplante Trainings
                                        </MenuItem>
                                        <MenuItem href={"training/request/open"} icon={<TbClock size={20} />}>
                                            Offene Trainingsanfragen
                                        </MenuItem>
                                    </CollapsableMenu>
                                </div>

                                <RenderIf
                                    truthValue={userPermissions.indexOf("mentor.view".toUpperCase()) != -1}
                                    elementTrue={
                                        <>
                                            <div className="menu-title menu-title-transparent">Mentoren</div>
                                            <CollapsableMenu title={"Mitglieder"} icon={<TbUsers size={20} />}>
                                                <MenuItem href={"administration/users/search"} icon={<TbSearch size={20} />}>
                                                    Mitglied Suchen
                                                </MenuItem>
                                                <MenuItem icon={<TbList size={20} />}>Übersicht Trainees</MenuItem>
                                            </CollapsableMenu>

                                            <CollapsableMenu title={"Trainings | CPTs"} icon={<TbCalendar size={20} />}>
                                                <MenuItem icon={<TbList size={20} />}>Meine Trainings</MenuItem>
                                                <MenuItem href={"administration/training-request/open"} icon={<TbInbox size={20} />}>
                                                    Offene Trainingsanfragen
                                                </MenuItem>
                                                <MenuItem icon={<TbCalendarStats size={20} />}>Geplante Trainings</MenuItem>
                                                <MenuItem icon={<TbCalendarEvent size={20} />}>CPT Übersicht</MenuItem>
                                            </CollapsableMenu>
                                        </>
                                    }
                                />

                                <RenderIf
                                    truthValue={userPermissions.indexOf("lm.view".toUpperCase()) != -1}
                                    elementTrue={
                                        <>
                                            <div className="menu-title menu-title-transparent">LM</div>
                                            <MenuItem icon={<TbCertificate size={20} />}>Freigabegruppen</MenuItem>
                                            <CollapsableMenu title={"Mentorgruppen"} icon={<TbUsers size={20} />}>
                                                <MenuItem href={"administration/mentor-group"} icon={<TbListCheck size={20} />}>
                                                    Verwalten
                                                </MenuItem>
                                                <MenuItem href={"administration/mentor-group/create"} icon={<TbFilePlus size={20} />}>
                                                    Erstellen
                                                </MenuItem>
                                            </CollapsableMenu>
                                            <CollapsableMenu title={"Kurse"} icon={<TbClipboardList size={20} />}>
                                                <MenuItem href={"administration/course"} icon={<TbListDetails size={20} />}>
                                                    Kurse Verwalten
                                                </MenuItem>
                                                <MenuItem href={"administration/course/create"} icon={<TbFilePlus size={20} />}>
                                                    Kurs Erstellen
                                                </MenuItem>
                                            </CollapsableMenu>
                                            <CollapsableMenu title={"Trainingstypen"} icon={<TbTemplate size={20} />}>
                                                <MenuItem href={"administration/training-type"} icon={<TbListDetails size={20} />}>
                                                    Trainingstypen Verwalten
                                                </MenuItem>
                                                <MenuItem href={"administration/training-type/create"} icon={<TbFilePlus size={20} />}>
                                                    Trainingstyp Erstellen
                                                </MenuItem>
                                            </CollapsableMenu>
                                            <CollapsableMenu title={"Skillvorlagen"} icon={<TbTemplate size={20} />}>
                                                <MenuItem icon={<TbListDetails size={20} />}>Skillvorlagen Verwalten</MenuItem>
                                                <MenuItem icon={<TbFilePlus size={20} />}>Skillvorlage Erstellen</MenuItem>
                                            </CollapsableMenu>
                                            <CollapsableMenu title={"Logvorlagen"} icon={<TbTemplate size={20} />}>
                                                <MenuItem icon={<TbListDetails size={20} />}>Logvorlagen Verwalten</MenuItem>
                                                <MenuItem href={"administration/log-template/create"} icon={<TbFilePlus size={20} />}>
                                                    Logvorlage Erstellen
                                                </MenuItem>
                                            </CollapsableMenu>
                                            <CollapsableMenu title={"Aktionen | Bedingungen"} icon={<TbAdjustments size={20} />}>
                                                <MenuItem icon={<TbListCheck size={20} />}>Verwalten</MenuItem>
                                                <MenuItem icon={<TbFilePlus size={20} />}>Erstellen</MenuItem>
                                            </CollapsableMenu>
                                        </>
                                    }
                                />

                                <RenderIf
                                    truthValue={userPermissions.indexOf("atd.view".toUpperCase()) != -1}
                                    elementTrue={
                                        <>
                                            <div className="menu-title menu-title-transparent">ATD</div>
                                            <CollapsableMenu requiredPerms={"atd.examiner.view"} title={"Prüfer"} icon={<TbUsers size={20} />}>
                                                <MenuItem icon={<TbClipboardList size={20} />}>CPTs</MenuItem>
                                                <MenuItem icon={<TbCalendar size={20} />}>Offene CPTs</MenuItem>
                                                <MenuItem icon={<TbList size={20} />}>Meine CPTs</MenuItem>
                                            </CollapsableMenu>

                                            <MenuItem requiredPerm={"atd.fast_track.view"} icon={<TbChevronsRight size={20} />}>
                                                Fast-Tracks
                                            </MenuItem>
                                            <MenuItem requiredPerm={"atd.atsim.view"} icon={<TbSquareCheck size={20} />}>
                                                ATSIM Anfragen
                                            </MenuItem>
                                            <MenuItem requiredPerm={"atd.training_stations.view"} icon={<TbRss size={20} />}>
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
        </>
    );
}
