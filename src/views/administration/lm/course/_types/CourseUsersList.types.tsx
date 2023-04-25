import { NavigateFunction } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import { UserModel } from "../../../../../models/User.model";
import { Button } from "../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../configs/theme/theme.config";
import { TbEye, TbTrash } from "react-icons/all";
import { Badge } from "../../../../../components/ui/Badge/Badge";
import { Dispatch } from "react";

function getColumns(
    navigate: NavigateFunction,
    setShowRemoveUserModal: Dispatch<boolean>,
    setSelectedUser: Dispatch<UserModel>
): (TableColumn<UserModel> & { searchable?: boolean })[] {
    return [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: row => row.first_name + " " + row.last_name,
            sortable: true,
            searchable: true,
        },
        {
            name: "Abgeschlossen",
            cell: row => {
                return row?.UsersBelongsToCourses?.completed ? <Badge color={COLOR_OPTS.SUCCESS}>Ja</Badge> : <Badge color={COLOR_OPTS.DANGER}>Nein</Badge>;
            },
            searchable: true,
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <div className={"flex"}>
                        <Button
                            className={"my-3"}
                            onClick={() => navigate(`/administration/users/${row.id}`)}
                            size={SIZE_OPTS.SM}
                            variant={"twoTone"}
                            color={COLOR_OPTS.PRIMARY}
                            icon={<TbEye size={20} />}></Button>
                        <Button
                            className={"my-3 ml-2"}
                            variant={"twoTone"}
                            onClick={() => {
                                setSelectedUser(row);
                                setShowRemoveUserModal(true);
                            }}
                            size={SIZE_OPTS.SM}
                            color={COLOR_OPTS.DANGER}
                            icon={<TbTrash size={20} />}></Button>
                    </div>
                );
            },
        },
    ];
}

export default {
    getColumns,
};
