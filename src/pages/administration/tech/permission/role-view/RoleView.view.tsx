import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { Card } from "../../../../../components/ui/Card/Card";
import { Input } from "../../../../../components/ui/Input/Input";
import { Button } from "../../../../../components/ui/Button/Button";
import { TbCheckbox, TbPlus } from "react-icons/all";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../assets/theme.config";
import { Tabs } from "../../../../../components/ui/Tabs/Tabs";
import PermissionAdministrationService from "../../../../../services/permissions/PermissionAdminService";
import RoleAdministrationService from "../../../../../services/permissions/RoleAdminService";
import { useParams } from "react-router-dom";
import { RolePermissionTablePartial } from "./_partials/RolePermissionTable.partial";
import { RoleUserTablePartial } from "./_partials/RoleUserTable.partial";
import { FormEvent, useState } from "react";
import FormHelper from "../../../../../utils/helper/FormHelper";
import ToastHelper from "../../../../../utils/helper/ToastHelper";

const name_regex: RegExp = RegExp("^(?!\\s*$).+");

export function RoleViewView() {
    const { role_id } = useParams();

    const [updating, setUpdating] = useState<boolean>(false);
    const { permissions, loading: loadingPermissions } = PermissionAdministrationService.getPermissions();
    const { roleData, setRoleData, loading: loadingRoleData } = RoleAdministrationService.getRoleInformation(role_id);

    const tabHeader = ["Berechtigungen", "Benutzer" + (loadingRoleData ? null : ` (${roleData?.users?.length})`)];

    function handleUpdate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUpdating(true);

        const data = FormHelper.getEntries(e.target);

        RoleAdministrationService.update(role_id, data)
            .then(() => {
                ToastHelper.success("Rolle aktualisiert");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Aktualisieren der Rolle");
            })
            .finally(() => setUpdating(false));
    }

    return (
        <>
            <PageHeader title={"Rolle Bearbeiten"} />

            <Card header={"Informationen"} headerBorder>
                <form onSubmit={handleUpdate}>
                    <Input label={"Name"} regex={name_regex} regexMatchEmpty description={"Name der Rolle"} name={"name"} labelSmall value={roleData?.name} />

                    <Button
                        loading={updating}
                        type={"submit"}
                        className={"mt-4"}
                        icon={<TbCheckbox size={20} />}
                        variant={"twoTone"}
                        size={SIZE_OPTS.SM}
                        color={COLOR_OPTS.PRIMARY}>
                        Speichern
                    </Button>
                </form>
            </Card>

            <Card
                className={"mt-5"}
                header={"Benutzer & Berechtigungen"}
                headerBorder
                headerExtra={
                    <Button size={SIZE_OPTS.XS} icon={<TbPlus size={20} />} variant={"twoTone"} color={COLOR_OPTS.PRIMARY}>
                        Benutzer Hinzufügen
                    </Button>
                }>
                <Tabs tabHeaders={tabHeader} type={"underline"}>
                    <RolePermissionTablePartial
                        loading={loadingRoleData || loadingPermissions}
                        permissions={permissions}
                        role={roleData}
                        setRole={setRoleData}
                    />
                    <RoleUserTablePartial loading={loadingRoleData || loadingPermissions} users={roleData?.users} />
                </Tabs>
            </Card>
        </>
    );
}
