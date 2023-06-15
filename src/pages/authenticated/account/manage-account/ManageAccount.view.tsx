import { Tabs } from "../../../../components/ui/Tabs/Tabs";
import { PageHeader } from "../../../../components/ui/PageHeader/PageHeader";
import { ManageAccountProfilePartial } from "./_subpages/ManageAccountProfile.partial";
import { ManageAccountSettingsPartial } from "./_subpages/ManageAccountSettings.partial";
import { ManageAccountDangerPartial } from "./_subpages/ManageAccountDanger.partial";
import React from "react";
import { Card } from "../../../../components/ui/Card/Card";

const tabHeaders = ["Profile", "Settings", "Notifications", "Gefahrenbereich"];

export function ManageAccountView() {
    return (
        <>
            <PageHeader
                title={"Konto Verwalten"}
                breadcrumbs={<pre className={"bg-gray-200 mt-2 md:mt-0 dark:bg-gray-700 px-3 rounded text-gray-400"}>{"v" + APP_VERSION}</pre>}
                hideBackLink
            />

            <Card>
                <Tabs tabHeaders={tabHeaders} type={"underline"}>
                    <ManageAccountProfilePartial />
                    <ManageAccountSettingsPartial />
                    <></>
                    <ManageAccountDangerPartial />
                </Tabs>
            </Card>
        </>
    );
}
