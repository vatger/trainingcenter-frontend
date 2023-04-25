import { useNavigate } from "react-router-dom";
import { TbArrowLeft } from "react-icons/all";
import { ReactElement } from "react";

type PageHeaderProps = {
    title: string | ReactElement;
    breadcrumbs?: ReactElement | string;
    hideBackLink?: boolean;
    navigateHref?: string;
};

export function PageHeader(props: PageHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className={`flex flex-col ${props.hideBackLink == true && "mb-7"}`}>
            <div className={"flex w-full justify-between flex-col md:flex-row"}>
                <h2 style={{ marginBottom: 0 }} className={"mb-4 pb-0 mr-7"}>
                    {props.title}
                </h2>
                {props.breadcrumbs && (
                    <h6 className={"pt-0 font-normal text-gray-400 dark:text-gray-500 self-center hidden sm:block mr-auto md:mr-0"}>{props.breadcrumbs}</h6>
                )}
            </div>

            {(props.hideBackLink == null || !props.hideBackLink) && (
                <div className={"flex justify-between mt-3 mb-7"}>
                    <div onClick={() => navigate(-1)} className={"back-link hover:underline hover:cursor-pointer"}>
                        <div className={"flex"}>
                            <TbArrowLeft className={"text-primary"} size={20} /> <span className={"pl-2 text-primary"}>zurück</span>
                        </div>
                    </div>
                    <div></div>
                </div>
            )}
        </div>
    );
}
