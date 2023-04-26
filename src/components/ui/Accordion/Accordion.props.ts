import {ReactElement} from "react";

export type AccordionProps = {
    expanded?: boolean;
    title?: string;
    children?: ReactElement | ReactElement[];
    className?: string
}