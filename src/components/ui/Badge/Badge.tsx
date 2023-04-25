import { ReactElement } from "react";
import { COLOR_OPTS } from "../../../configs/theme/theme.config";
import { joinClassNames } from "../../../utils/helper/ClassNameHelper";
import { getBadgeColorClass } from "./Badge.helper";

export function Badge(props: { children: ReactElement | ReactElement[] | string | number; color?: COLOR_OPTS; className?: string }) {
    const classes = joinClassNames("badge font-semibold", getBadgeColorClass(props.color), props.className ?? "");

    return <span className={classes}>{props.children}</span>;
}
