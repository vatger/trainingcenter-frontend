import {createContext, useState} from "react";

export interface ISideNavMenuContext {
    menuExtended: boolean;
    toggleMenuExtended: () => void;
}

export const sideNavMenuContext = createContext<ISideNavMenuContext>({} as ISideNavMenuContext);

function getExtendedByWidth(): boolean {
    return window.innerWidth > 640;
}

export function SideNavMenuProvider(props: any) {
    const [menuExtended, setMenuExtended] = useState<boolean>(getExtendedByWidth());

    function toggleMenuExtended() {
        setMenuExtended(!menuExtended);
    }

    return (
        <>
            <sideNavMenuContext.Provider value={{ menuExtended, toggleMenuExtended }}>{props.children}</sideNavMenuContext.Provider>
        </>
    );
}
