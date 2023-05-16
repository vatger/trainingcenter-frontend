import {BiCheck} from "react-icons/all";
import {MenuItem} from "../../ui/MenuItem/MenuItem";
import {useContext, useEffect, useRef, useState} from "react";
import {generateUUID} from "../../../utils/helper/UUIDHelper";

import "./GenericHeaderAnimation.scss";
import languageContext, {LanguageEnum} from "../../../utils/contexts/LanguageContext";
import languageTranslation from "../../../assets/lang/language.translation";

const flag_de = (
    <div className={"w-[20px] h-[20px] avatar-circle"}>
        <img
            className={"avatar-img avatar-circle"}
            alt={"German Flag"}
            src={"https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png"}
        />
    </div>
);
const flag_en = (
    <div className={"w-[20px] h-[20px] avatar-circle"}>
        <img
            className={"avatar-img avatar-circle"}
            alt={"UK Flag"}
            src={"https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png"}
        />
    </div>
);

export function SelectLanguageHeader() {
    const { language, changeLanguage } = useContext(languageContext);

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
    });

    return (
        <div>
            <div className="dropdown">
                <div className="dropdown-toggle" onClick={() => setLanguageMenuHidden(false)} id={`dropdown-toggle-${selectLanguageUUID.current}`}>
                    <div className="header-action-item header-action-item-hoverable flex items-center">
                        <span className="avatar avatar-circle w-[20px] h-[20px] min-w-[20px]" style={{ lineHeight: 24, fontSize: 12 }}>
                            {language == LanguageEnum.EN ? flag_en : flag_de}
                        </span>
                    </div>
                </div>

                {/* Dropdown */}
                <ul id={`dropdown-${selectLanguageUUID.current}`} className={"dropdown-menu bottom-end right-[-94px] sm:right-0 min-w-[220px] hidden"}>
                    <MenuItem
                        onClick={() => {
                            changeLanguage(LanguageEnum.DE);
                        }}
                        isNoLink
                        icon={flag_de}
                        icon_suffix={language == LanguageEnum.DE ? <BiCheck size={20} /> : <></>}>
                        {languageTranslation.german[language]}
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            changeLanguage(LanguageEnum.EN);
                        }}
                        isNoLink
                        icon={flag_en}
                        icon_suffix={language == LanguageEnum.EN ? <BiCheck size={20} /> : <></>}>
                        {languageTranslation.english[language]}
                    </MenuItem>
                </ul>
            </div>
        </div>
    );
}
