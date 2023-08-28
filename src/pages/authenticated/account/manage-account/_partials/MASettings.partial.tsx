import { ManageAccountElement } from "../../../../../components/ui/Account/ManageAccountElement";
import { Checkbox } from "../../../../../components/ui/Checkbox/Checkbox";
import { Select } from "../../../../../components/ui/Select/Select";
import { Button } from "../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../assets/theme.config";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import darkModeContext from "../../../../../utils/contexts/DarkModeContext";
import languageContext, { LanguageEnum } from "../../../../../utils/contexts/LanguageContext";
import GDPRService from "../../../../../services/user/UserGDPRService";
import ToastHelper from "../../../../../utils/helper/ToastHelper";
import { TbDownload, TbRefresh, TbRefreshOff } from "react-icons/all";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import authContext from "../../../../../utils/contexts/AuthContext";
import moment from "moment";
import axios from "axios";
import { axiosInstance } from "@/utils/network/AxiosInstance";

export function MASettingsPartial() {
    const navigate = useNavigate();
    const { user } = useContext(authContext);
    const { darkMode, changeDarkMode } = useContext(darkModeContext);
    const { language, changeLanguage } = useContext(languageContext);

    const [submittingSettings, setSubmittingSettings] = useState<boolean>(false);

    // GDPR
    const [loadingGDPR, setLoadingGDPR] = useState<boolean>(false);

    // VATSIM Data synchronisation
    const [dataSynchronisationDisabled] = useState<boolean>(moment().diff(moment(user?.user_data?.updatedAt), "minutes") < 30);
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

    function updateSettings(value: { dark_mode: boolean; language: string }) {
        setSubmittingSettings(true);

        axiosInstance
            .patch("/settings", value)
            .then(() => {
                ToastHelper.success("Einstellungen erfolgreich gespeichert");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim speichern der Einstellungen");
            })
            .finally(() => setSubmittingSettings(false));
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
            <ManageAccountElement
                title={"Language"}
                element={
                    <div className={"w-full lg:w-1/2 float-right"}>
                        <Select
                            defaultValue={language.toString()}
                            onChange={(newLanguage: string) => {
                                setLanguage(newLanguage);
                                updateSettings({ dark_mode: darkMode, language: newLanguage });
                            }}
                            disabled={submittingSettings}>
                            <option value="de">German</option>
                            <option value="en">English</option>
                        </Select>
                    </div>
                }
            />
            <ManageAccountElement
                title={"Dark Mode"}
                element={
                    <div className={"float-right"}>
                        <Checkbox
                            checked={darkMode}
                            disabled={submittingSettings}
                            onChange={v => {
                                changeDarkMode(v);
                                updateSettings({ dark_mode: v, language: language });
                            }}
                        />
                    </div>
                }
            />
            <ManageAccountElement
                break
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
                        block
                        disabled={dataSynchronisationDisabled}
                        onClick={() => navigate("2fa")}
                        icon={dataSynchronisationDisabled ? <TbRefreshOff size={20} /> : <TbRefresh size={20} />}
                        className={"ml-auto float-right w-full md:w-auto"}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}>
                        {dataSynchronisationDisabled ? "Nicht Verfügbar" : "Jetzt Synchronisieren"}
                    </Button>
                }
            />
            <ManageAccountElement
                hideBottomBorder
                break
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
                        className={"ml-auto float-right w-full md:w-auto"}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}>
                        Herunterladen
                    </Button>
                }
            />
        </>
    );
}
