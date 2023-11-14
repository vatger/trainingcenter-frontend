import { TableColumn } from "react-data-table-component";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { Button } from "@/components/ui/Button/Button";
import { TbEye } from "react-icons/tb";
import { NavigateFunction } from "react-router-dom";
import dayjs from "dayjs";
import {Config} from "@/core/Config";

function getColumns(navigate: NavigateFunction): (TableColumn<TrainingStationModel> & { searchable?: boolean })[] {
    return [
        {
            name: "Callsign",
            selector: row => row.callsign.toUpperCase(),
            searchable: true,
            sortable: true,
        },
        {
            name: "Frequenz",
            selector: row => row.frequency?.toFixed(3) ?? "Wird Ermittelt",
            searchable: true,
            sortable: true,
        },
        {
            name: "Zuletzt Aktualisiert (UTC)",
            selector: row => dayjs.utc(row.updatedAt).format(Config.DATETIME_FORMAT)
        },
    ];
}

export default { getColumns };
