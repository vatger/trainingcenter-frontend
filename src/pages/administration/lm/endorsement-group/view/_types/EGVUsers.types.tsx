import { TableColumn } from "react-data-table-component";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbTrash } from "react-icons/tb";
import { Button } from "@/components/ui/Button/Button";
import { UserModel } from "@/models/UserModel";
import { Badge } from "@/components/ui/Badge/Badge";
import dayjs from "dayjs";
import { Config } from "@/core/Config";

type OnRemoveFunction = (userID: number) => any;

function getColumns(onRemove: OnRemoveFunction): (TableColumn<UserModel> & { searchable?: boolean })[] {
    return [
        {
            name: "ID",
            selector: row => row.id.toString(),
            sortable: true,
            searchable: true,
        },
        {
            name: "Name",
            selector: row => `${row.first_name} ${row.last_name}`,
            sortable: true,
            searchable: true,
        },
        {
            name: "Solo",
            cell: row => {
                if (row.EndorsementGroupsBelongsToUsers?.solo) {
                    return (
                        <Badge color={COLOR_OPTS.DANGER}>
                            <>
                                {dayjs.utc(row.EndorsementGroupsBelongsToUsers.solo_expires).format(Config.DATE_FORMAT)} |{" "}
                                {row.EndorsementGroupsBelongsToUsers.solo_extension_count} Verl.
                            </>
                        </Badge>
                    );
                }

                return <Badge color={COLOR_OPTS.PRIMARY}>Nein</Badge>;
            },
        },
        {
            name: "Freigabe Am",
            selector: row => dayjs.utc(row.EndorsementGroupsBelongsToUsers?.createdAt).format(Config.DATE_FORMAT),
            sortable: true,
            searchable: true,
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <Button
                        className={"my-3"}
                        onClick={() => {
                            onRemove(row.id);
                        }}
                        size={SIZE_OPTS.SM}
                        variant={"twoTone"}
                        color={COLOR_OPTS.DANGER}
                        icon={<TbTrash size={20} />}>
                        Löschen
                    </Button>
                );
            },
        },
    ];
}

export default {
    getColumns,
};