import { ReactElement, useEffect, useState } from "react";

export type TabProps = {
    tabHeaders: ReactElement[] | string[];
    children: ReactElement[];
    type: "pills" | "underline";
    onChange?: (index: number) => any;
};

function getInitialPage(tabHeaders: string[]) {
    let hash = window.location.hash;
    hash = hash.replace("#", "");
    if (hash == null) return 0;

    tabHeaders = tabHeaders.map(value => value.toLowerCase());
    hash = hash.toLowerCase();

    if (Array.isArray(tabHeaders)) {
        const idx = tabHeaders.indexOf(hash);
        return idx == -1 ? 0 : idx;
    }
    return 0;
}

export function Tabs(props: TabProps) {
    const [activePage, setActivePage] = useState<number>(getInitialPage(props.tabHeaders as string[]));

    const headerClasses = {
        active: props.type == "underline" ? "tab-nav-active text-indigo-600 border-indigo-600" : "tab-nav-active text-indigo-600 bg-indigo-50",
        inactive: props.type == "underline" ? "tab-nav tab-nav-underline dark:text-indigo-100" : "tab-nav tab-nav-pill dark:text-indigo-100",
    };

    return (
        <div className="tabs">
            <div
                role="tablist"
                className={
                    "sm:tab-list tab-list-sm tab-hide-scrollbar overflow-x-hidden sm:overflow-x-auto" +
                    (props.type === "underline" ? " tab-list-underline" : " tab-list-pill")
                }>
                {props.tabHeaders.map((value, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                setActivePage(index);
                                props.onChange?.(index);
                            }}
                            className={"w-full sm:w-auto " + headerClasses.inactive + (index === activePage ? " " + headerClasses.active : "")}
                            role="tab"
                            aria-selected={index === 0 ? "true" : "false"}>
                            <>{value}</>
                        </div>
                    );
                })}
            </div>
            <div className={"pt-4"}>{props.children[activePage] ?? <></>}</div>
        </div>
    );
}
