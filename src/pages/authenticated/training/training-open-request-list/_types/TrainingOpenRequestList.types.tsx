import {TableColumn} from "react-data-table-component";
import {TrainingRequestModel} from "../../../../../models/TrainingRequest.model";
import {Badge} from "../../../../../components/ui/Badge/Badge";
import {COLOR_OPTS, SIZE_OPTS} from "../../../../../assets/theme.config";
import React from "react";
import moment from "moment";
import {Button} from "../../../../../components/ui/Button/Button";
import {TbEye} from "react-icons/all";
import {NavigateFunction} from "react-router-dom";

function getColumns(navigate: NavigateFunction): TableColumn<TrainingRequestModel>[] {
    return [
        {
            name: "Trainings Typ",
            selector: row => row.training_type?.name ?? "N/A",
        },
        {
            name: "Kurs",
            selector: row => row.course?.name ?? "N/A",
        },
        {
            name: "Status",
            cell: row => {
                switch (row.status) {
                    case "requested":
                        return <Badge color={COLOR_OPTS.PRIMARY}>Beantragt</Badge>;

                    case "planned":
                        return <Badge color={COLOR_OPTS.SUCCESS}>Geplant</Badge>;

                    default:
                        return "N/A";
                }
            },
        },
        {
            name: "Beantragt Am (UTC)",
            cell: row => moment(row.createdAt).utc().format("DD.MM.YYYY HH:mm"),
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
