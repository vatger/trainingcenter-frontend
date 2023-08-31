import { ManageAccountElement } from "@/components/ui/Account/ManageAccountElement";
import { Select } from "@/components/ui/Select/Select";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS } from "@/assets/theme.config";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import themeContext from "../../../../../utils/contexts/ThemeContext";
import languageContext, { LanguageEnum } from "../../../../../utils/contexts/LanguageContext";
import GDPRService from "../../../../../services/user/UserGDPRService";
import ToastHelper from "../../../../../utils/helper/ToastHelper";
import { TbDownload, TbRefresh, TbRefreshOff } from "react-icons/all";
import { RenderIf } from "@/components/conditionals/RenderIf";
import authContext from "../../../../../utils/contexts/AuthContext";
import moment from "moment";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { UserModel } from "@/models/UserModel";
import dayjs from "dayjs";

export function MASettingsPartial() {
    const navigate = useNavigate();
    const { user, changeUser } = useContext(authContext);
    const { themeString, changeDarkMode } = useContext(themeContext);
    const { language, changeLanguage } = useContext(languageContext);

    const [submittingSettings, setSubmittingSettings] = useState<boolean>(false);

    // GDPR
    const [loadingGDPR, setLoadingGDPR] = useState<boolean>(false);

    // VATSIM Data synchronisation
    const [syncingData, setSyncingData] = useState<boolean>(false);
    const [dataSynchronisationDisabled] = useState<boolean>(dayjs.utc().diff(dayjs(user?.user_data?.updatedAt), "minutes") < 30);
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

    function updateSettings(value: { language: string }) {
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

    function updateUserData() {
        setSyncingData(true);
        axiosInstance
            .get("/user/update")
            .then((res: AxiosResponse) => {
                const user = res.data as UserModel;
                changeUser(user);
                ToastHelper.success("Daten erfolgreich synchronisiert");
            })
            .catch(() => {
                axiosInstance
                    .post("/auth/logout")
                    .then(res => {
                        if (res.data.success) {
                            window.location.replace("/login?refresh");
                        }
                    })
                    .catch(() => {
                        ToastHelper.error("Fehler beim Aktualisieren deiner Daten");
                    });
            })
            .finally(() => setSyncingData(false));
    }

    console.log(themeString);

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
                                updateSettings({ language: newLanguage });
                            }}
                            disabled={submittingSettings}>
                            <option value="de">German</option>
                            <option value="en">English</option>
                        </Select>
                    </div>
                }
            />

            <RenderIf
                truthValue={themeString != null && user != null}
                elementTrue={
                    <ManageAccountElement
                        title={
                            <>
                                Dark Mode
                                <span className={"flex text-xs mt-1.5"}>Diese Einstellung betrifft nur das aktuelle Gerät</span>
                            </>
                        }
                        element={
                            <div className={"w-full lg:w-1/2  float-right"}>
                                <Select
                                    onChange={value => {
                                        changeDarkMode(value as "auto" | "dark" | "light");
                                    }}
                                    defaultValue={themeString}>
                                    <option value="auto">Automatisch (Betriebssystem)</option>
                                    <option value="dark">Dunkel</option>
                                    <option value="light">Hell</option>
                                </Select>
                            </div>
                        }
                    />
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
                                    Um {dayjs.utc(lastUserDataUpdateDate).add(30, "minutes").format("HH:mm")} UTC verfügbar
                                </span>
                            }
                        />
                    </>
                }
                element={
                    <Button
                        block
                        disabled={dataSynchronisationDisabled}
                        onClick={updateUserData}
                        loading={syncingData}
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
