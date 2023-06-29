import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CourseModel } from "../../../../../models/CourseModel";
import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { Table } from "../../../../../components/ui/Table/Table";
import { TableColumn } from "react-data-table-component";
import { getCourseTableColumns } from "./_types/CL.types";
import { getEditableCourses } from "../../../../../services/course/CourseAdminService";
import { Card } from "../../../../../components/ui/Card/Card";

export function CourseListView() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [courseData, setCourseData] = useState<CourseModel[]>([]);

    useEffect(() => {
        getEditableCourses().then(res => {
            setCourseData(res.data as CourseModel[]);
            setLoading(false);
        });
    }, []);

    const columns: (TableColumn<CourseModel> & { searchable?: boolean })[] = getCourseTableColumns(navigate);

    return (
        <>
            <PageHeader title={"Kurse Verwalten"} hideBackLink />

            <Card>
                <Table searchable paginate loading={loading} columns={columns} data={courseData} />
            </Card>
        </>
    );
}
