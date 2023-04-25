import vaccLogoDark from "../../assets/img/vacc_logo_dark.png";
import vaccLogo from "../../assets/img/vacc_logo.png";

import { COLOR_OPTS } from "../../configs/theme/theme.config";
import { Button } from "../../components/ui/Button/Button";
import React, { useContext, useState } from "react";
import authContext from "../../utils/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { SelectLanguageHeader } from "../../components/template/header/SelectLanguageHeader";
import { Checkbox } from "../../components/ui/Checkbox/Checkbox";
import { TbArrowRight, TbRefresh } from "react-icons/all";
import LoginService from "../../services/login/Login.service";
import { UserModel } from "../../models/User.model";
import { RenderIf } from "../../components/conditionals/RenderIf";
import { APIResponseError } from "../../exceptions/APIResponseError";
import { NetworkError } from "../../components/errors/NetworkError";

export function LoginCallbackView() {
    const navigate = useNavigate();
    const { changeUser } = useContext(authContext);

    const [rememberCheckboxState, setRememberCheckboxState] = useState<boolean>(false);
    const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);
    const [signInError, setSignInError] = useState<APIResponseError>(undefined);

    function login() {
        setLoadingSignIn(true);

        LoginService.handleLogin(rememberCheckboxState)
            .then((user: UserModel) => {
                changeUser(user);
                navigate("/overview");
            })
            .catch((err: AxiosError) => {
                setSignInError({
                    error: err,
                    custom: {
                        code: "ERR_SIGN_IN",
                        message: "Failed to log in",
                    },
                });
            })
            .finally(() => {
                setLoadingSignIn(false);
            });
    }

    return (
        <>
            <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
                <div className="h-full flex flex-auto flex-col justify-between">
                    <main className="h-full">
                        <div className="page-container relative h-full flex flex-auto flex-col">
                            <div className="grid lg:grid-cols-3 h-full">
                                <div
                                    className="bg-no-repeat bg-cover bg-center py-6 px-16 flex-col justify-end hidden lg:flex"
                                    style={{ backgroundImage: "url('https://cdn.discordapp.com/attachments/954516195963461634/1063564334074171392/7.jpg')" }}>
                                    <div>
                                        <div className="mb-6 flex items-center gap-4">
                                            <span className="text-white">
                                                Copyright {new Date().getFullYear()} <span className="font-semibold">VATSIM Germany</span>{" "}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                                    <div className="xl:min-w-[450px] px-8">
                                        <RenderIf
                                            truthValue={signInError != null}
                                            elementTrue={
                                                <div className={"mb-5"}>
                                                    <NetworkError error={signInError?.error} closeable={false} />
                                                </div>
                                            }
                                        />

                                        <div className="mb-8">
                                            <h3 className="mb-1">{loadingSignIn ? "Wird angemeldet..." : "Angemeldet Bleiben?"}</h3>
                                        </div>
                                        <div className={"mb-6"}>
                                            <p className={"xl:max-w-[500px]"}>
                                                {loadingSignIn
                                                    ? "Wir melden Dich gerade an. Gedulde Dich bitte ein paar Momente."
                                                    : `Wähle aus, ob Du diesem PC vertrauen möchtest. Dies hat einen Einfluss darauf, wie lange es dauert, bis Du Dich wieder neu anmelden musst.
                                                    Falls Du in einem öffentlichen Netz (bspw. im Hotel oder am Flughafen) bist, raten davon ab diese Option auszuwählen.`}
                                            </p>
                                        </div>

                                        <RenderIf
                                            truthValue={!loadingSignIn}
                                            elementTrue={
                                                <div>
                                                    <Checkbox checked={rememberCheckboxState} onChange={checked => setRememberCheckboxState(checked)}>
                                                        Angemeldet Bleiben
                                                    </Checkbox>
                                                </div>
                                            }
                                        />

                                        <div>
                                            <Button
                                                color={COLOR_OPTS.PRIMARY}
                                                variant={"twoTone"}
                                                className={"mt-8"}
                                                loading={loadingSignIn}
                                                block
                                                icon={signInError == null ? <TbArrowRight size={24} /> : <TbRefresh size={24} />}
                                                onClick={() => {
                                                    if (signInError != null) {
                                                        navigate("/login");
                                                        return;
                                                    }
                                                    setSignInError(undefined);
                                                    login();
                                                }}>
                                                {signInError == null ? "Weiter" : "Erneut versuchen"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <div className={"absolute top-0 left-0 h-[100px] w-full"}>
                <div>
                    <div className="logo absolute m-4">
                        <a href={"https://vatsim-germany.org"} target={"_blank"}>
                            <img className={"w-[210px] hidden dark:block lg:block"} src={vaccLogoDark} alt="VATGER Logo" />
                            <img className={"w-[210px] dark:hidden lg:hidden"} src={vaccLogo} alt="VATGER Logo" />
                        </a>
                    </div>
                    <div className={"m-4 absolute float-right right-0"}>
                        <SelectLanguageHeader />
                    </div>
                </div>
            </div>

            <div className={"absolute bottom-0 right-0 pr-16 pb-6"}>
                <pre className={"mb-6 bg-gray-100 dark:bg-gray-700 px-3 rounded text-gray-400"}>{"v" + APP_VERSION}</pre>
            </div>
        </>
    );
}
