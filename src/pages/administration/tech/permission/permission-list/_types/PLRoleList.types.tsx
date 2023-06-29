import { NavigateFunction } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import { RoleModel } from "../../../../../../models/PermissionModel";
import moment from "moment/moment";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { TbEye } from "react-icons/all";

function getTableColumn(navigate: NavigateFunction): (TableColumn<RoleModel> & { searchable?: boolean })[] {
    return [
        {
            name: "Name",
            selector: row => row.name,
            searchable: true,
            sortable: true,
        },
        {
            name: "Erstellt am",
            selector: row => moment(row.createdAt).format("DD.MM.YYYY HH:mm"),
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <Button
                        className={"my-3"}
                        onClick={() => navigate(`roles/${row.id}`)}
                        size={SIZE_OPTS.SM}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}
                        icon={<TbEye size={20} />}>
                        Ansehen
                    </Button>
                );
            },
        },
    ];
}

export default {
    getTableColumn,
};
