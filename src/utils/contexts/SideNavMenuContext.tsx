import { createContext, useState } from "react";
import { MOBILE_MAX_WIDTH_PX } from "../../assets/theme.config";

export interface ISideNavMenuContext {
    menuExtended: boolean;
    toggleMenuExtended: () => void;
}

export const sideNavMenuContext = createContext<ISideNavMenuContext>({} as ISideNavMenuContext);

function getExtendedByWidth(): boolean {
    return window.innerWidth > MOBILE_MAX_WIDTH_PX;
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
