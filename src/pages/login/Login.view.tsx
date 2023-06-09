import { COLOR_OPTS } from "../../assets/theme.config";
import React, { useContext, useEffect } from "react";
import { Button } from "../../components/ui/Button/Button";
import { SelectLanguageHeader } from "../../components/template/header/SelectLanguageHeader";
import loginTranslation from "../../assets/lang/login/login.translation";
import languageContext from "../../utils/contexts/LanguageContext";
import vaccLogoDark from "../../assets/img/vacc_logo_dark.png";
import LoginService from "../../services/login/LoginService";
import authContext from "../../utils/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../models/UserModel";
import vaccLogo from "../../assets/img/vacc_logo.png";
import { LoginStatusPartial } from "./_partials/LoginStatus.partial";

export function LoginView() {
    const { language } = useContext(languageContext);
    const { changeUser } = useContext(authContext);
    const navigate = useNavigate();
    const { uri, loading, loadingError } = LoginService.getOAuthRedirectUri();

    useEffect(() => {
        LoginService.validateSession()
            .then((user: UserModel) => {
                changeUser(user);
                navigate("/overview");
            })
            .catch(() => {});
    }, []);

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
                                                &copy; {new Date().getFullYear()} <span className="font-semibold">VATSIM Germany</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                                    <div className="xl:min-w-[450px] px-8 sm:pt-auto pt-20 pb-5">
                                        <LoginStatusPartial loadingError={loadingError} />

                                        <div className="mb-8">
                                            <h3 className="mb-1">VATSIM Germany Training Center</h3>
                                        </div>
                                        <div className={"mb-8"}>
                                            <p className={"xl:max-w-[500px]"}>
                                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                                                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
                                                clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                                                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
                                                diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                                                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                                diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                                                accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                                                dolor sit amet.
                                            </p>
                                        </div>
                                        <div>
                                            <Button
                                                loading={loading}
                                                disabled={loadingError != null}
                                                icon={
                                                    <img
                                                        src={
                                                            "https://vatsim-forums.nyc3.digitaloceanspaces.com/monthly_2020_08/Vatsim-social_icon.thumb.png.e9bdf49928c9bd5327f08245a68d8304.png"
                                                        }
                                                        width={24}
                                                        height={24}
                                                    />
                                                }
                                                variant={"twoTone"}
                                                block
                                                onClick={() => {
                                                    window.location.replace(uri);
                                                }}
                                                color={COLOR_OPTS.PRIMARY}>
                                                {loginTranslation.button[language]}
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
                    <div className={"hidden sm:block m-4 absolute float-right right-0"}>
                        <SelectLanguageHeader />
                    </div>
                </div>
            </div>

            <div className={"hidden sm:block absolute bottom-0 right-0 pr-16 pb-6"}>
                <pre className={"mb-6 bg-gray-100 dark:bg-gray-700 px-3 rounded text-gray-400"}>{"v" + APP_VERSION}</pre>
            </div>
        </>
    );
}
