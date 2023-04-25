import { TableColumn } from "react-data-table-component";
import { Table } from "../../../../../../components/ui/Table/Table";
import { UserModel } from "../../../../../../models/User.model";
import RoleUserTableTypes from "../_types/RoleUserTable.types";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../../configs/theme/theme.config";
import { TbPlus } from "react-icons/all";

export function RoleUserTablePartial(props: { loading: boolean; users: UserModel[] | undefined }) {
    const roleUserColumns: TableColumn<UserModel>[] = RoleUserTableTypes.getColumns();

    return (
        <>
            <Table loading={props.loading} columns={roleUserColumns} data={props.users ?? []} />
        </>
    );
}
