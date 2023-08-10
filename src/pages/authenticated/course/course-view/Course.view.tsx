import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import CourseInformationService from "../../../../services/course/CourseInformationService";
import { CVGeneralPartial } from "./_partials/CVGeneral.partial";
import { CVInitialTrainingPartial } from "./_partials/CVInitialTraining.partial";

export function CourseView() {
    const { uuid } = useParams();

    const { course, loading, loadingError } = CourseInformationService.getCourseInformationByUUID(uuid ?? "");

    return (
        <>
            <PageHeader title={course?.name ?? "Lade Kursübersicht"} />

            <CVGeneralPartial course={course} />

            <CVInitialTrainingPartial course={course} />
        </>
    );
}
