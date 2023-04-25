import { ManageAccountElementPartial } from "../_partials/ManageAccountElement.partial";
import { Checkbox } from "../../../../../components/ui/Checkbox/Checkbox";
import { Select } from "../../../../../components/ui/Select/Select";
import { Button } from "../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../configs/theme/theme.config";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import darkModeContext from "../../../../../utils/contexts/DarkModeContext";
import languageContext, { LanguageEnum } from "../../../../../utils/contexts/LanguageContext";
import GDPRService from "../../../../../services/user/GDPR.service";
import ToastHelper from "../../../../../utils/helper/ToastHelper";
import { TbDownload, TbRefresh, TbRefreshOff } from "react-icons/all";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import authContext from "../../../../../utils/contexts/AuthContext";
import moment, { now } from "moment";

export function ManageAccountSettingsPartial() {
    const navigate = useNavigate();
    const { user } = useContext(authContext);
    const { darkMode, changeDarkMode } = useContext(darkModeContext);
    const { language, changeLanguage } = useContext(languageContext);

    // GDPR
    const [loadingGDPR, setLoadingGDPR] = useState<boolean>(false);

    // VATSIM Data synchronisation
    const [dataSynchronisationDisabled, setDataSynchronisationDisabled] = useState<boolean>(moment().diff(moment(user?.user_data?.updatedAt), "minutes") < 30);
    const lastUserDataUpdateDate: Date = user?.user_data?.updatedAt ?? new Date();

    function setLanguage(lang: string) {
        const l = lang.toLowerCase();

        switch (l) {
            case "de":
                changeLanguage(LanguageEnum.DE);
                break;

            case "en":
                changeLanguage(LanguageEnum.EN);
                break;
        }
    }

    function downloadGDPR() {
        setLoadingGDPR(true);
        GDPRService.getData()
            .then(() => {})
            .catch(err => {
                console.log(err);
                ToastHelper.error("Fehler beim herunterladen deiner Daten");
            })
            .finally(() => setLoadingGDPR(false));
    }

    return (
        <>
            <ManageAccountElementPartial
                title={"Language"}
                element={
                    <Select defaultValue={language == LanguageEnum.DE ? "de" : "en"} onChange={(language: string) => setLanguage(language)} disabled={false}>
                        <option value="de">German</option>
                        <option value="en">English</option>
                    </Select>
                }
            />
            <ManageAccountElementPartial
                title={"Dark Mode"}
                element={
                    <div className={"float-right"}>
                        <Checkbox checked={darkMode} onChange={changeDarkMode} />
                    </div>
                }
            />
            <ManageAccountElementPartial
                title={
                    <>
                        Vatsim Daten Synchronisieren
                        <RenderIf
                            truthValue={dataSynchronisationDisabled}
                            elementTrue={
                                <span className={"text-danger flex text-xs mt-1.5"}>
                                    Um {moment(lastUserDataUpdateDate).add(30, "minutes").utc().format("HH:mm")} UTC verfügbar
                                </span>
                            }
                        />
                    </>
                }
                element={
                    // TODO: change disabled to allowed to update state
                    <Button
                        disabled={dataSynchronisationDisabled}
                        onClick={() => navigate("2fa")}
                        icon={dataSynchronisationDisabled ? <TbRefreshOff size={20} /> : <TbRefresh size={20} />}
                        className={"ml-auto float-right"}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}>
                        {dataSynchronisationDisabled ? "Nicht Verfügbar" : "Jetzt Synchronisieren"}
                    </Button>
                }
            />
            <ManageAccountElementPartial
                hideBottomBorder
                title={
                    <>
                        Personenbezogene Daten Herunterladen
                        <span className={"flex text-xs mt-1.5"}>Gemäß Art. 15 Abs. 3 DSGVO</span>
                    </>
                }
                element={
                    <Button
                        onClick={downloadGDPR}
                        loading={loadingGDPR}
                        icon={<TbDownload size={20} />}
                        className={"ml-auto float-right"}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}>
                        Herunterladen
                    </Button>
                }
            />
        </>
    );
}
