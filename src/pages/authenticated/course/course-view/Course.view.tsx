import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import CourseInformationService from "../../../../services/course/CourseInformationService";
import { CVGeneralPartial } from "./_partials/CVGeneral.partial";
import { CVInitialTrainingPartial } from "./_partials/CVInitialTraining.partial";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { CourseViewSkeleton } from "@/pages/authenticated/course/course-view/_skeletons/CourseView.skeleton";

export function CourseView() {
    const { uuid } = useParams();

    const { course, loading, loadingError } = CourseInformationService.getCourseInformationByUUID(uuid ?? "");

    return (
        <>
            <PageHeader title={course?.name ?? "Lade Kursübersicht"} />

            <RenderIf
                truthValue={loading}
                elementTrue={<CourseViewSkeleton />}
                elementFalse={
                    <>
                        <CVGeneralPartial course={course} />
                        <CVInitialTrainingPartial course={course} />
                    </>
                }
            />
        </>
    );
}
