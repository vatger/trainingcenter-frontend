import { TableColumn } from "react-data-table-component";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { Button } from "@/components/ui/Button/Button";
import { TbEye } from "react-icons/tb";
import { NavigateFunction } from "react-router-dom";
import dayjs from "dayjs";
import { Config } from "@/core/Config";

function getColumns(navigate: NavigateFunction): (TableColumn<TrainingStationModel> & { searchable?: boolean })[] {
    return [
        {
            name: "Callsign",
            selector: row => row.callsign.toUpperCase(),
            searchable: true,
            sortable: true,
        },
        {
            name: "gcap_class",
            selector: row => row.gcap_class,
            searchable: false,
            sortable: true,
        },
        {
            name: "gcap_class_group",
            selector: row => row.gcap_class_group ?? "Wird Ermittelt",
            searchable: true,
            sortable: true,
        },
        {
            name: "gcap_training_airport",
            selector: row => (row.gcap_training_airport ? "Ja" : "Nein"),
            searchable: false,
            sortable: true,
        },
        {
            name: "s1_twr",
            selector: row => (row.s1_twr ? "Ja" : "Nein"),
            searchable: false,
            sortable: true,
        },
        {
            name: "Zuletzt Aktualisiert (UTC)",
            selector: row => dayjs.utc(row.updatedAt).format(Config.DATETIME_FORMAT),
        },
    ];
}

export default { getColumns };
