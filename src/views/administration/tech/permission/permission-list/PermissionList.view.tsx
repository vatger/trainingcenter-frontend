import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { RoleListPartial } from "./_partials/RoleList.partial";
import { PermissionListPartial } from "./_partials/PermissionList.partial";

export function PermissionListView() {
    return (
        <>
            <PageHeader title={"Rechteverwaltung"} hideBackLink />

            <RoleListPartial />
            <PermissionListPartial />
        </>
    );
}
