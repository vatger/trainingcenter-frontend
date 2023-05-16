import {Spinner} from "../../../components/ui/Spinner/Spinner";
import {RenderIf} from "../../../components/conditionals/RenderIf";
import vaccLogoDark from "../../../assets/img/vacc_logo_dark.png";
import vaccLogo from "../../../assets/img/vacc_logo.png";
import {SelectLanguageHeader} from "../../../components/template/header/SelectLanguageHeader";
import React from "react";

export function AuthContextLoadingView() {
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
                                    <RenderIf
                                        truthValue={false}
                                        elementTrue={<></>}
                                        elementFalse={
                                            <div className="xl:min-w-[450px] px-8">
                                                <div className="xl:min-w-[450px] px-8">
                                                    <div className="mb-8">
                                                        <h3 className="mb-1">Willkommen zurück</h3>
                                                    </div>
                                                    <div className={"mb-8"}>
                                                        <p className={"xl:max-w-[500px]"}>Wir melden Dich gerade an. Gedulde Dich bitte ein paar Momente.</p>
                                                    </div>
                                                    <div>
                                                        <Spinner size={50} />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    />
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
        </>
    );
}
