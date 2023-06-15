import { TableColumn } from "react-data-table-component";
import { UserModel } from "../../../../../../models/UserModel";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { TbCircleMinus } from "react-icons/all";

function getColumns(): TableColumn<UserModel>[] {
    return [
        {
            name: "ID",
            selector: row => row.id,
        },
        {
            name: "Name",
            selector: row => row.first_name + " " + row.last_name,
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <Button variant={"twoTone"} size={SIZE_OPTS.SM} color={COLOR_OPTS.DANGER} icon={<TbCircleMinus size={20} />}>
                        Entfernen
                    </Button>
                );
            },
        },
    ];
}

export default {
    getColumns,
};
