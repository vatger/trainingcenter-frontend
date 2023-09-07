import { Card } from "../../../../../../components/ui/Card/Card";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { Table } from "../../../../../../components/ui/Table/Table";
import { Button } from "../../../../../../components/ui/Button/Button";
import { TbPlus } from "react-icons/tb";
import { TableColumn } from "react-data-table-component";
import { RoleModel } from "../../../../../../models/PermissionModel";
import RoleListTypes from "../_types/PLRoleList.types";
import { useNavigate } from "react-router-dom";
import RoleAdministrationService from "../../../../../../services/permissions/RoleAdminService";
import { NetworkError } from "../../../../../../components/errors/NetworkError";
import { RenderIf } from "../../../../../../components/conditionals/RenderIf";

export function PLRoleListPartial() {
    const { roles, loading, loadingError } = RoleAdministrationService.getRoles();

    const navigate = useNavigate();
    const roleColumns: (TableColumn<RoleModel> & { searchable?: boolean })[] = RoleListTypes.getTableColumn(navigate);

    return (
        <Card
            header={"Rollen"}
            headerExtra={
                <Button variant={"twoTone"} size={SIZE_OPTS.XS} color={COLOR_OPTS.PRIMARY} icon={<TbPlus size={20} />}>
                    Rolle Hinzufügen
                </Button>
            }
            headerBorder>
            <RenderIf
                truthValue={loadingError != null}
                elementTrue={<NetworkError closeable={false} error={loadingError?.error ?? null} />}
                elementFalse={
                    <>
                        <Table columns={roleColumns} data={roles} loading={loading} />
                    </>
                }
            />
        </Card>
    );
}
