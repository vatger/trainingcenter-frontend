import {TableColumn} from "react-data-table-component";
import {TrainingRequestModel} from "@/models/TrainingRequestModel";
import dayjs from "dayjs";
import {Config} from "@/core/Config";
import {Badge} from "@/components/ui/Badge/Badge";
import {COLOR_OPTS} from "@/assets/theme.config";
import React from "react";

function getColumns(): TableColumn<TrainingRequestModel>[] {
    return [
        {
            name: "Name",
            selector: row => row.training_type?.name ?? "N/A"
        },
        {
            name: "Erstellt Am (UTC)",
            selector: row => dayjs.utc(row.createdAt).format(Config.DATETIME_FORMAT)
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
            }
        }
    ]
}

export default {
    getColumns
}