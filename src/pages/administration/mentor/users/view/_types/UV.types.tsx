import { NavigateFunction } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import { EndorsementGroupModel } from "@/models/EndorsementGroupModel";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS } from "@/assets/theme.config";
import { CourseModel } from "@/models/CourseModel";
import moment from "moment";

function getEndorsementTableColumns(navigate: NavigateFunction): (TableColumn<EndorsementGroupModel> & { searchable?: boolean })[] {
    return [
        {
            name: "Name",
            selector: row => row.name,
        },
        {
            name: "Solo",
            cell: row => {
                if (row.EndorsementGroupsBelongsToUsers?.solo) {
                    return (
                        <Badge color={COLOR_OPTS.DANGER}>
                            <>
                                {dayjs.utc(row.EndorsementGroupsBelongsToUsers.solo_expires).format(Config.DATE_FORMAT)} |{" "}
                                {row.EndorsementGroupsBelongsToUsers.solo_extension_count} Verl.
                            </>
                        </Badge>
                    );
                }

                return <Badge color={COLOR_OPTS.PRIMARY}>Nein</Badge>;
            },
        },
        {
            name: "Freigabe Am",
            selector: row => dayjs.utc(row.EndorsementGroupsBelongsToUsers?.createdAt).format(Config.DATE_FORMAT),
        },
        {
            name: "Aktion",
            selector: () => "TODO",
        },
    ];
}

function getCoursesTableColumns(navigate: NavigateFunction): TableColumn<CourseModel>[] {
    return [
        {
            name: "Kurs",
            selector: row => row.name,
            sortable: true,
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
            name: "Eingeschrieben Am",
            selector: row => moment(row.through?.createdAt).format(Config.DATE_FORMAT),
        },
        {
            name: "Aktion",
            cell: () => "TODO",
        },
    ];
}

export default {
    getEndorsementTableColumns,
    getCoursesTableColumns,
};
