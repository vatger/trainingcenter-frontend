import { TableColumn } from "react-data-table-component";
import { Table } from "../../../../../../components/ui/Table/Table";
import { UserModel } from "../../../../../../models/UserModel";
import RoleUserTableTypes from "../_types/RoleUserTable.types";

export function RoleUserTablePartial(props: { loading: boolean; users: UserModel[] | undefined }) {
    const roleUserColumns: TableColumn<UserModel>[] = RoleUserTableTypes.getColumns();

    return (
        <>
            <Table loading={props.loading} columns={roleUserColumns} data={props.users ?? []} />
        </>
    );
}
