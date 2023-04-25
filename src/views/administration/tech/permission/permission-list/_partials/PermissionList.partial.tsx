import { Card } from "../../../../../../components/ui/Card/Card";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../configs/theme/theme.config";
import { Table } from "../../../../../../components/ui/Table/Table";
import { Button } from "../../../../../../components/ui/Button/Button";
import { TbPlus } from "react-icons/all";
import { AddPermissionModalPartial } from "./AddPermissionModal.partial";
import PermissionAdministrationService from "../../../../../../services/permissions/Permission.admin.service";
import { useNavigate } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import { PermissionModel } from "../../../../../../models/Permission.model";
import { getPermissionTableColumns } from "../_types/PermissionList.types";
import { useState } from "react";

export function PermissionListPartial() {
    const navigate = useNavigate();
    const [showAddPermModal, setShowAddPermModal] = useState<boolean>(false);

    const { permissions, setPermissions, loading: loadingPermissions } = PermissionAdministrationService.getPermissions();

    const permissionColumns: TableColumn<PermissionModel>[] = getPermissionTableColumns(navigate);

    return (
        <>
            <Card
                header={"Berechtigungen"}
                className={"mt-5"}
                headerExtra={
                    <Button
                        size={SIZE_OPTS.XS}
                        variant={"twoTone"}
                        onClick={() => setShowAddPermModal(true)}
                        color={COLOR_OPTS.PRIMARY}
                        icon={<TbPlus size={20} />}>
                        Berechtigung Hinzufügen
                    </Button>
                }
                headerBorder>
                <Table columns={permissionColumns} data={permissions} loading={loadingPermissions} />
            </Card>

            <AddPermissionModalPartial
                show={showAddPermModal}
                onClose={() => setShowAddPermModal(false)}
                onCreate={p => {
                    setPermissions([...permissions, p]);
                }}
            />
        </>
    );
}
