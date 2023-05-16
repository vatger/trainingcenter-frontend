import {TableColumn} from "react-data-table-component";
import {COLOR_OPTS, SIZE_OPTS} from "../../../../../assets/theme.config";
import {Button} from "../../../../../components/ui/Button/Button";
import {TbEye, TbEyeOff, TbTrash} from "react-icons/all";
import {TrainingStationModel} from "../../../../../models/TrainingStation.model";
import {Badge} from "../../../../../components/ui/Badge/Badge";

function getColumns(): (TableColumn<TrainingStationModel> & { searchable?: boolean })[] {
    return [
        {
            name: "Station",
            selector: row => row.callsign,
            sortable: true,
            searchable: true,
        },
        {
            name: "Aktiv",
            cell: row => {
                if (row.deactivated) return <Badge color={COLOR_OPTS.DANGER}>Nein</Badge>;
                else return <Badge color={COLOR_OPTS.SUCCESS}>Ja</Badge>;
            },
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <div className={"flex"}>
                        <Button
                            className={"my-3"}
                            onClick={() => {}}
                            size={SIZE_OPTS.SM}
                            variant={"twoTone"}
                            color={COLOR_OPTS.PRIMARY}
                            icon={row.deactivated ? <TbEye size={20} /> : <TbEyeOff size={20} />}></Button>
                        <Button
                            className={"my-3 ml-2"}
                            onClick={() => {}}
                            size={SIZE_OPTS.SM}
                            variant={"twoTone"}
                            color={COLOR_OPTS.DANGER}
                            icon={<TbTrash size={20} />}></Button>
                    </div>
                );
            },
        },
    ];
}

export default {
    getColumns,
};
