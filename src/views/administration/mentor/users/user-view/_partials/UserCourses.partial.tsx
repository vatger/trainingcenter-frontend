import { CourseModel } from "../../../../../../models/Course.model";
import { TableColumn } from "react-data-table-component";
import { getCoursesTableColumns } from "../_types/CoursesList.types";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../../../../components/ui/Table/Table";
import { Badge } from "../../../../../../components/ui/Badge/Badge";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../configs/theme/theme.config";
import React from "react";
import { Card } from "../../../../../../components/ui/Card/Card";
import { Button } from "../../../../../../components/ui/Button/Button";
import { TbEye, TbPlus } from "react-icons/all";

export function UserCoursesPartial(props: { courses: CourseModel[] | undefined }) {
    const navigate = useNavigate();
    const columns: TableColumn<CourseModel>[] = getCoursesTableColumns(navigate);

    return (
        <Card
            header={"Kurse"}
            className={"mt-7"}
            headerBorder
            headerExtra={
                <Button size={SIZE_OPTS.XS} variant={"twoTone"} color={COLOR_OPTS.PRIMARY} icon={<TbPlus size={20} />}>
                    In Kurs Einschreiben
                </Button>
            }>
            <Table columns={columns} data={props.courses ?? []} />
        </Card>
    );
}
