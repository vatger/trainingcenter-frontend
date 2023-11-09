import { TableColumn } from "react-data-table-component";
import { TrainingRequestModel } from "../../../../../models/TrainingRequestModel";
import { Badge } from "../../../../../components/ui/Badge/Badge";
import moment from "moment";
import { Button } from "../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../assets/theme.config";
import { TbEye } from "react-icons/tb";
import React from "react";
import { NavigateFunction } from "react-router-dom";

function getColumns(navigate: NavigateFunction): TableColumn<TrainingRequestModel>[] {
    return [
        {
            name: "Name",
            selector: row => row.training_type?.name ?? "N/A",
            sortable: true,
        },
        {
            name: "Status",
            cell: row => {
                switch (row.status) {
                    case "requested":
                        return <Badge color={COLOR_OPTS.PRIMARY}>Beantragt</Badge>;

                    case "planned":
                        return <Badge color={COLOR_OPTS.SUCCESS}>Geplant</Badge>;

                    case "cancelled":
                        return <Badge color={COLOR_OPTS.DANGER}>Abgesagt</Badge>;

                    case "completed":
                        return <Badge>Abgeschlossen</Badge>;

                    default:
                        return "N/A";
                }
            },
            sortable: true,
            sortFunction: (a: TrainingRequestModel, b: TrainingRequestModel) => {
                return a.status > b.status ? -1 : 1;
            },
        },
        {
            name: "Station",
            selector: row => row.training_station?.callsign?.toUpperCase() ?? "N/A",
            sortable: true,
        },
        {
            name: "Ablaufdatum",
            cell: row => {
                if (row.status != "requested") return "N/A";

                const date = moment(row.expires).utc();
                if (date.isBefore(moment())) {
                    return <span className={"text-danger"}>{date.format("DD.MM.YYYY HH:mm")}</span>;
                }
                return moment(row.expires).utc().format("DD.MM.YYYY HH:mm");
            },
            sortable: true,
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <div className={"flex"}>
                        <Button
                            className={"my-3"}
                            size={SIZE_OPTS.SM}
                            onClick={() => navigate("/training/request/" + row.uuid)}
                            variant={"twoTone"}
                            color={COLOR_OPTS.PRIMARY}
                            icon={<TbEye size={20} />}>
                            Ansehen
                        </Button>
                    </div>
                );
            },
        },
    ];
}

export default {
    getColumns,
};
