import { BiCheck } from "react-icons/bi";
import { MenuItem } from "../../ui/MenuItem/MenuItem";
import { useContext, useEffect, useRef, useState } from "react";
import { generateUUID } from "@/utils/helper/UUIDHelper";

import "./GenericHeaderAnimation.scss";
import languageTranslation from "../../../assets/lang/language.translation";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";

import flagDe from "@/assets/img/flag_de.png";
import flagEn from "@/assets/img/flag_en.png";
import { setLanguage, useSettingsSelector } from "@/app/features/settingsSlice";
import { store } from "@/app/store";

const flag_de = (
    <div className={"w-[20px] h-[20px] avatar-circle"}>
        <img className={"avatar-img avatar-circle"} alt={"German Flag"} src={flagDe} />
    </div>
);
const flag_en = (
    <div className={"w-[20px] h-[20px] avatar-circle"}>
        <img className={"avatar-img avatar-circle"} alt={"UK Flag"} src={flagEn} />
    </div>
);

export function SelectLanguageHeader({ saveSelection }: { saveSelection?: boolean }) {
    const { language } = useSettingsSelector();

    const selectLanguageUUID = useRef(generateUUID());
    const [languageMenuHidden, setLanguageMenuHidden] = useState<boolean>(true);

    useEffect(() => {
        document.addEventListener("mousedown", e => {
            if (e.button !== 0) return;

            const click_div = document.getElementById(`dropdown-toggle-${selectLanguageUUID.current}`);
            const dropdown = document.getElementById(`dropdown-${selectLanguageUUID.current}`);
            if (dropdown == null || click_div == null) return;

            if (languageMenuHidden && !dropdown.contains(e.target as Node) && !click_div.contains(e.target as Node)) {
                dropdown.classList.add("hidden");
                dropdown.classList.remove("dropdown-expand");
                setLanguageMenuHidden(true);
            } else if (languageMenuHidden) {
                dropdown.classList.remove("hidden");
                dropdown.classList.add("dropdown-expand");

                setTimeout(() => {
                    setLanguageMenuHidden(false);
                }, 150);
            }
        });

        return document.removeEventListener("mousedown", e => {
            if (e.button !== 0) return;

            const click_div = document.getElementById(`dropdown-toggle-${selectLanguageUUID.current}`);
            const dropdown = document.getElementById(`dropdown-${selectLanguageUUID.current}`);
            if (dropdown == null || click_div == null) return;

            if (languageMenuHidden && !dropdown.contains(e.target as Node) && !click_div.contains(e.target as Node)) {
                dropdown.classList.add("hidden");
                dropdown.classList.remove("dropdown-expand");
                setLanguageMenuHidden(true);
            } else if (languageMenuHidden) {
                dropdown.classList.remove("hidden");
                dropdown.classList.add("dropdown-expand");

                setTimeout(() => {
                    setLanguageMenuHidden(false);
                }, 150);
            }
        });
    }, []);

    const [submitting, setSubmitting] = useState<boolean>(false);

    function updateSettings(value: { language: string }) {
        if (!saveSelection) return;

        setSubmitting(true);

        axiosInstance
            .patch("/settings", value)
            .then(() => {
                ToastHelper.success("Sprachauswahl erfolgreich gespeichert");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim speichern der Einstellungen");
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <div>
            <div className="dropdown">
                <div className="dropdown-toggle" onClick={() => setLanguageMenuHidden(false)} id={`dropdown-toggle-${selectLanguageUUID.current}`}>
                    <div className="header-action-item header-action-item-hoverable flex items-center">
                        <span className="avatar avatar-circle w-[20px] h-[20px] min-w-[20px]" style={{ lineHeight: 24, fontSize: 12 }}>
                            {language == "en" ? flag_en : flag_de}
                        </span>
                    </div>
                </div>

                {/* Dropdown */}
                <ul id={`dropdown-${selectLanguageUUID.current}`} className={"dropdown-menu bottom-end right-[-94px] sm:right-0 min-w-[220px] hidden"}>
                    <MenuItem
                        disabled={submitting}
                        onClick={() => {
                            store.dispatch(setLanguage("de"));
                            updateSettings({ language: "de" });
                        }}
                        isNoLink
                        icon={flag_de}
                        icon_suffix={language == "de" ? <BiCheck size={20} /> : <></>}>
                        {languageTranslation.german[language]}
                    </MenuItem>
                    <MenuItem
                        disabled={submitting}
                        onClick={() => {
                            store.dispatch(setLanguage("en"));
                            updateSettings({ language: "en" });
                        }}
                        isNoLink
                        icon={flag_en}
                        icon_suffix={language == "en" ? <BiCheck size={20} /> : <></>}>
                        {languageTranslation.english[language]}
                    </MenuItem>
                </ul>
            </div>
        </div>
    );
}
