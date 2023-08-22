import { TableColumn } from "react-data-table-component";
import { UserModel } from "@/models/UserModel";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbTrash } from "react-icons/all";
import { Dispatch } from "react";

function getColumns(): TableColumn<UserModel>[] {

    return [
        {
            name: "CID",
            selector: row => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: row => row.first_name + " " + row.last_name,
            sortable: true,
        }
    ];
}

export default {
    getColumns,
};
