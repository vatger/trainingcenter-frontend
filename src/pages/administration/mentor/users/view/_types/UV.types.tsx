import { NavigateFunction } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import { EndorsementGroupModel } from "@/models/EndorsementGroupModel";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { CourseModel } from "@/models/CourseModel";
import moment from "moment";
import { Button } from "@/components/ui/Button/Button";
import { TbEye } from "react-icons/tb";

function getCoursesTableColumns(navigate: NavigateFunction, user_id: string): TableColumn<CourseModel>[] {
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
            cell: row => {
                return (
                    <div className={"flex"}>
                        <Button
                            className={"my-3"}
                            onClick={() => navigate(`/administration/user-course-progress/${row.uuid}/${user_id}`)}
                            size={SIZE_OPTS.SM}
                            variant={"twoTone"}
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

function getEndorsementTableColumns(navigate: NavigateFunction): (TableColumn<EndorsementGroupModel> & { searchable?: boolean })[] {
    return [
        {
            name: "Name",
            selector: row => row.name,
        },
        {
            name: "Solo",
            cell: row => {
                if (row.EndorsementGroupsBelongsToUsers?.solo_id != null) {
                    return <Badge color={COLOR_OPTS.DANGER}>Ja</Badge>;
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

export default {
    getCoursesTableColumns,
    getEndorsementTableColumns,
};
