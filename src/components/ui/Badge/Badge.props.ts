import {ReactElement} from "react";
import {COLOR_OPTS} from "../../../configs/theme/theme.config";

export type BadgeProps = {
    children: ReactElement | ReactElement[] | string | number;
    color?: COLOR_OPTS;
    className?: string
}