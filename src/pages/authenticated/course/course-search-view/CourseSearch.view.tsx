import {PageHeader} from "../../../../components/ui/PageHeader/PageHeader";
import {useParams} from "react-router-dom";
import CourseInformationService from "../../../../services/course/CourseInformation.service";
import {GeneralInformationPartial} from "./_partials/GeneralInformation.partial";
import {InitialTrainingPartial} from "./_partials/InitialTraining.partial";

export function CourseSearchView() {
    const { uuid } = useParams();

    const { course, loading, loadingError } = CourseInformationService.getCourseInformationByUUID(uuid ?? "");

    return (
        <>
            <PageHeader title={course?.name ?? "Lade Kursübersicht"} />

            <GeneralInformationPartial course={course} />

            <InitialTrainingPartial course={course} />
        </>
    );
}
