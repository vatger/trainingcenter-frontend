import { ReactElement } from "react";

export type TabsProps = {
    tabHeaders: ReactElement[] | string[];
    children: ReactElement[];
    type: "pills" | "underline";
    onChange?: (index: number) => any;
};
