import { TableColumn } from "react-data-table-component";
import { SyslogModel } from "../../../../../../models/SyslogModel";
import moment from "moment/moment";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { TbEye } from "react-icons/tb";
import { NavigateFunction } from "react-router-dom";

function getColumns(navigate: NavigateFunction): TableColumn<SyslogModel>[] {
    return [
        {
            name: "Method",
            selector: row => row.method,
        },
        {
            name: "Path",
            selector: row => row.path,
        },
        {
            name: "Datum",
            selector: row => moment(row.createdAt).format("DD.MM.YYYY HH:mm:ss"),
        },
        {
            name: "Aktion",
            cell: row => {
                return (
                    <Button
                        className={"my-3"}
                        onClick={() => navigate(`${row.id}`)}
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
