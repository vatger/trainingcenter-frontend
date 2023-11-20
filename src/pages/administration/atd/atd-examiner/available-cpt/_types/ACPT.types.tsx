import { NavigateFunction } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbCircleCheck, TbEye } from "react-icons/tb";

function getColumns(): (TableColumn<TrainingSessionModel> & { searchable?: boolean })[] {
    return [
        {
            name: "Datum (UTC)",
            selector: row => dayjs.utc(row.date).format(Config.DATETIME_FORMAT),
            sortable: true,
            searchable: true,
        },
        {
            name: "Trainee",
            selector: row => row.users?.map(u => `${u.first_name} ${u.last_name} (${u.id})`).join(",") ?? "N/A",
        },
        {
            name: "Mentor",
            selector: row => `${row.mentor?.first_name} ${row.mentor?.last_name} (${row.mentor?.id})`,
        },
        {
            name: "Station",
            selector: row => row.training_station?.callsign ?? "N/A",
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <Button className={"my-3"} size={SIZE_OPTS.SM} variant={"twoTone"} color={COLOR_OPTS.PRIMARY} icon={<TbCircleCheck size={20} />}>
                        Anmelden
                    </Button>
                );
            },
        },
    ];
}

export default {
    getColumns,
};
