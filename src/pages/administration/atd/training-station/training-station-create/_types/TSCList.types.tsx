import { TableColumn } from "react-data-table-component";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbEye, TbTrash } from "react-icons/tb";
import { Dispatch } from "react";

function getColumns(
    stations: { callsign: string; frequency?: number }[],
    setStations: Dispatch<{ callsign: string; frequency?: number }[]>
): TableColumn<{ callsign: string; frequency?: number }>[] {
    function removeStation(callsign: string) {
        const newStations = stations.filter(s => s.callsign != callsign);
        setStations(newStations);
    }

    return [
        {
            name: "Callsign",
            selector: row => row.callsign.toUpperCase(),
        },
        {
            name: "Frequenz",
            selector: row => row.frequency?.toFixed(3) ?? "Wird Ermittelt",
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <div className={"flex"}>
                        <Button
                            className={"my-3 ml-2"}
                            variant={"twoTone"}
                            onClick={() => {
                                removeStation(row.callsign);
                            }}
                            size={SIZE_OPTS.SM}
                            color={COLOR_OPTS.DANGER}
                            icon={<TbTrash size={20} />}></Button>
                    </div>
                );
            },
        },
    ];
}

export default { getColumns };
