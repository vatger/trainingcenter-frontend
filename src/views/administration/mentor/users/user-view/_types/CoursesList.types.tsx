import { TableColumn } from "react-data-table-component";
import moment from "moment/moment";
import { NavigateFunction } from "react-router-dom";
import { CourseModel } from "../../../../../../models/Course.model";
import { Badge } from "../../../../../../components/ui/Badge/Badge";
import { COLOR_OPTS } from "../../../../../../configs/theme/theme.config";

export function getCoursesTableColumns(navigate: NavigateFunction): TableColumn<CourseModel>[] {
    return [
        {
            name: "Kurs",
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Eingeschrieben Am",
            selector: row => moment(row.through?.createdAt).format("DD.MM.YYYY HH:mm"),
        },
        {
            name: "Status",
            cell: row =>
                row.UsersBelongsToCourses?.completed ? (
                    <Badge color={COLOR_OPTS.SUCCESS}>Abgeschlossen</Badge>
                ) : (
                    <Badge color={COLOR_OPTS.PRIMARY}>Aktiv</Badge>
                ),
        },
        {
            name: "Aktion",
            cell: row => "TODO",
        },
    ];
}
