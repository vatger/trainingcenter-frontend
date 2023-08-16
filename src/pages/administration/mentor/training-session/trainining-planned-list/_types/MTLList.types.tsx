import {NavigateFunction} from "react-router-dom";
import {TableColumn} from "react-data-table-component";
import {TrainingSessionModel} from "@/models/TrainingSessionModel";
import dayjs from "dayjs";
import {Config} from "@/core/Config";

function getColumns(navigate: NavigateFunction): TableColumn<TrainingSessionModel>[] {
    return [
        {
            name: "Datum",
            selector: row => dayjs.utc(row.date).format(Config.DATETIME_FORMAT)
        },
        {
            name: "Kurs",
            selector: row => row.course?.name ?? "N/A"
        },
        {
            name: "Trainingstyp",
            selector: row => row.training_type?.name ?? "N/A"
        },
        {
            name: "Teilnehmer",
            selector: row => row.training_session_belongs_to_users?.length ?? "N/A"
        },
        {
            name: "Aktion",
            cell: row => {
                return (<></>)
            }
        }
    ]
}

export default {
    getColumns
}