import { PageHeader } from "../../../../components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import CourseInformationService from "../../../../services/course/CourseInformationService";
import { CSVGeneralPartial } from "./_partials/CSVGeneral.partial";
import { CSVInitialTrainingPartial } from "./_partials/CSVInitialTraining.partial";

export function CourseSearchView() {
    const { uuid } = useParams();

    const { course, loading, loadingError } = CourseInformationService.getCourseInformationByUUID(uuid ?? "");

    return (
        <>
            <PageHeader title={course?.name ?? "Lade Kursübersicht"} />

            <CSVGeneralPartial course={course} />

            <CSVInitialTrainingPartial course={course} />
        </>
    );
}
