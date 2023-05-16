import {ReactElement} from "react";

export type ManageAccountElementPartialProps = {
    className?: string;
    title: string | ReactElement;
    hideBottomBorder?: boolean;
    element: ReactElement;
};

export function ManageAccountElementPartial(props: ManageAccountElementPartialProps) {
    return (
        <div className={"w-full grid grid-cols-3 py-9" + (props.hideBottomBorder ? "" : " border-b dark:border-b-gray-700") + ` ${props.className}`}>
            <div className={"flex flex-col justify-center"}>
                <div className={"text-gray-500 dark:text-gray-400 font-semibold"}>{props.title}</div>
            </div>

            <div className={"col-span-2"}>{props.element}</div>
        </div>
    );
}
