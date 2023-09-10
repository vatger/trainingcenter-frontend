import { TableColumn } from "react-data-table-component";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbTrash } from "react-icons/tb";
import { Dispatch } from "react";
import { Badge } from "@/components/ui/Badge/Badge";

function getColumns(
    stations: { callsign: string; deactivated: boolean }[],
    setStations: Dispatch<{ callsign: string; deactivated: boolean }[]>
): TableColumn<{ callsign: string; deactivated: boolean }>[] {
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
