import { TableColumn } from "react-data-table-component";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { Button } from "@/components/ui/Button/Button";
import { TbEye } from "react-icons/tb";
import { NavigateFunction } from "react-router-dom";

function getColumns(navigate: NavigateFunction): (TableColumn<TrainingStationModel> & { searchable?: boolean })[] {
    return [
        {
            name: "Callsign",
            selector: row => row.callsign.toUpperCase(),
            searchable: true,
        },
        {
            name: "Frequenz",
            selector: row => row.frequency?.toFixed(3) ?? "Wird Ermittelt",
            searchable: true,
        },
        {
            name: "Deaktiviert",
            cell: row => {
                if (row.deactivated) {
                    return <Badge color={COLOR_OPTS.DANGER}>Ja</Badge>;
                }

                return <Badge color={COLOR_OPTS.SUCCESS}>Nein</Badge>;
            },
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <div className={"flex"}>
                        <Button
                            className={"my-3 ml-2"}
                            onClick={() => navigate(`${row.id}`)}
                            variant={"twoTone"}
                            size={SIZE_OPTS.SM}
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

export default { getColumns };
