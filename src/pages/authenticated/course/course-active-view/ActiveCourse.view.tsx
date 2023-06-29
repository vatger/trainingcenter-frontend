import { useParams } from "react-router-dom";
import { PageHeader } from "../../../../components/ui/PageHeader/PageHeader";
import CourseInformationService from "../../../../services/course/CourseInformationService";
import { CAVInformationSkeleton } from "./_skeletons/CAVInformation.skeleton";
import { RenderIf } from "../../../../components/conditionals/RenderIf";
import { CAVTrainingHistorySkeleton } from "./_skeletons/CAVTrainingHistory.skeleton";
import React, { useState } from "react";
import UserTrainingService from "../../../../services/user/UserTrainingService";
import { CAVInformationPartial } from "./_partials/CAVInformation.partial";
import { CAVTrainingRequestsPartial } from "./_partials/CAVTrainingRequests.partial";
import { CAVTrainingHistoryPartial } from "./_partials/CAVTrainingHistory.partial";
import { CAVTrainingRequestsSkeleton } from "./_skeletons/CAVTrainingRequests.skeleton";

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
                        <CAVInformationSkeleton />
                        <CAVTrainingRequestsSkeleton />
                        <CAVTrainingHistorySkeleton />
                    </>
                }
                elementFalse={
                    <>
                        <CAVInformationPartial
                            showRequestTrainingModal={showRequestTrainingModal}
                            setShowRequestTrainingModal={setShowRequestTrainingModal}
                            setTrainingRequests={setTrainingRequests}
                            course={course}
                            loadingCourse={loadingCourse}
                            trainingRequests={trainingRequests}
                        />

                        <CAVTrainingRequestsPartial trainingRequests={trainingRequests} loadingTrainingRequests={loadingTrainingRequests} />

                        <CAVTrainingHistoryPartial trainingData={trainingData} />
                    </>
                }
            />
        </>
    );
}
