import { TableColumn } from "react-data-table-component";
import moment from "moment/moment";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { TbEye } from "react-icons/all";
import { Link, NavigateFunction } from "react-router-dom";
import { TrainingRequestModel } from "../../../../../../models/TrainingRequestModel";

function getColumns(navigate: NavigateFunction): TableColumn<TrainingRequestModel>[] {
    return [
        {
            name: "Trainee",
            cell: row =>
                row.user == null ? (
                    "N/A"
                ) : (
                    <Link to={"/administration/users/" + row.user?.id}>
                        <span className={"text-primary hover:cursor-pointer hover:underline"}>
                            {row.user.first_name} {row.user.last_name}
                        </span>
                    </Link>
                ),
        },
        {
            name: "CID",
            selector: row => row.user?.id ?? "N/A",
        },
        {
            name: "Training",
            selector: row => row.training_type?.name ?? "N/A",
        },
        {
            name: "Station",
            selector: row => row.training_station?.callsign ?? "N/A",
        },
        {
            name: "Solo Ende",
            selector: row => "xx.xx.xxxx",
        },
        {
            name: "Angefragt",
            selector: row => moment(row.createdAt).format("DD.MM.YYYY"),
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <Button
                        className={"my-3"}
                        onClick={() => navigate(`${row.uuid}`)}
                        size={SIZE_OPTS.SM}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}
                        icon={<TbEye size={20} />}>
                        Ansehen
                    </Button>
                );
            },
        },
    ];
}

export default {
    getColumns,
};