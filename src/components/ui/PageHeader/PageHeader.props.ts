import { ReactElement } from "react";

export type PageHeaderProps = {
    title: string | ReactElement;
    breadcrumbs?: ReactElement | string;
    hideBackLink?: boolean;
    navigateHref?: string;
};
