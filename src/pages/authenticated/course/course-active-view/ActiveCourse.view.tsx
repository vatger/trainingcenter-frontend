import { useParams } from "react-router-dom";
import { PageHeader } from "../../../../components/ui/PageHeader/PageHeader";
import CourseInformationService from "../../../../services/course/CourseInformationService";
import { CourseInformationSkeleton } from "../_skeletons/CourseInformation.skeleton";
import { RenderIf } from "../../../../components/conditionals/RenderIf";
import { CourseTrainingHistorySkeleton } from "../_skeletons/CourseTrainingHistory.skeleton";
import React, { useState } from "react";
import UserTrainingService from "../../../../services/user/UserTrainingService";
import { ActiveCourseInformationPartial } from "./_partials/ActiveCourseInformation.partial";
import { ActiveCourseTrainingRequestsPartial } from "./_partials/ActiveCourseTrainingRequests.partial";
import { ActiveCourseTrainingHistoryPartial } from "./_partials/ActiveCourseTrainingHistory.partial";
import { TrainingRequestSkeleton } from "../_skeletons/TrainingRequest.skeleton";

export function ActiveCourseView() {
    const { uuid } = useParams();
    const [showRequestTrainingModal, setShowRequestTrainingModal] = useState<boolean>(false);

    const { course, loading: loadingCourse } = CourseInformationService.getMyCourseInformationByUUID(uuid);
    const { trainingData, loading: loadingTrainingData } = CourseInformationService.getCourseTrainingInformationByUUID(uuid);
    const { trainingRequests, setTrainingRequests, loading: loadingTrainingRequests } = UserTrainingService.getTrainingRequestsByCourseUUID(uuid);

    return (
        <>
            <PageHeader title={"Kurs Verwalten"} />

            {/* Wait until all elements have loaded and show them all at the same time */}
            <RenderIf
                truthValue={loadingCourse || loadingTrainingData || loadingTrainingRequests}
                elementTrue={
                    <>
                        <CourseInformationSkeleton />
                        <TrainingRequestSkeleton />
                        <CourseTrainingHistorySkeleton />
                    </>
                }
                elementFalse={
                    <>
                        <ActiveCourseInformationPartial
                            showRequestTrainingModal={showRequestTrainingModal}
                            setShowRequestTrainingModal={setShowRequestTrainingModal}
                            setTrainingRequests={setTrainingRequests}
                            course={course}
                            loadingCourse={loadingCourse}
                            trainingRequests={trainingRequests}
                        />

                        <ActiveCourseTrainingRequestsPartial trainingRequests={trainingRequests} loadingTrainingRequests={loadingTrainingRequests} />

                        <ActiveCourseTrainingHistoryPartial trainingData={trainingData} />
                    </>
                }
            />
        </>
    );
}
