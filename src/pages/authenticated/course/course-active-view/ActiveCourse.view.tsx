import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import CourseInformationService from "../../../../services/course/CourseInformationService";
import { CAVInformationSkeleton } from "./_skeletons/CAVInformation.skeleton";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { CAVTrainingHistorySkeleton } from "./_skeletons/CAVTrainingHistory.skeleton";
import React, { useState } from "react";
import { CAVInformationPartial } from "./_partials/CAVInformation.partial";
import { CAVTrainingRequestsPartial } from "./_partials/CAVTrainingRequests.partial";
import { CAVTrainingHistoryPartial } from "./_partials/CAVTrainingHistory.partial";
import { CAVTrainingRequestsSkeleton } from "./_skeletons/CAVTrainingRequests.skeleton";
import useApi from "@/utils/hooks/useApi";
import { TrainingRequestModel } from "@/models/TrainingRequestModel";

export function ActiveCourseView() {
    const { uuid } = useParams();
    const [showRequestTrainingModal, setShowRequestTrainingModal] = useState<boolean>(false);

    const { course, loading: loadingCourse } = CourseInformationService.getMyCourseInformationByUUID(uuid);
    const { trainingData, loading: loadingTrainingData } = CourseInformationService.getCourseTrainingInformationByUUID(uuid);

    const {
        data: ActiveTrainingRequests,
        setData: setActiveTrainingRequests,
        loading: loadingActiveTrainingRequests,
    } = useApi<TrainingRequestModel[]>({
        url: `/user-info/training-request/${uuid}/active`,
        method: "get",
    });

    return (
        <>
            <PageHeader title={"Kurs Verwalten"} />

            {/* Wait until all elements have loaded and show them all at the same time */}
            <RenderIf
                truthValue={loadingCourse || loadingTrainingData || loadingActiveTrainingRequests}
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
                            setTrainingRequests={setActiveTrainingRequests}
                            course={course}
                            loadingCourse={loadingCourse}
                            trainingRequests={ActiveTrainingRequests ?? []}
                        />

                        <CAVTrainingRequestsPartial trainingRequests={ActiveTrainingRequests ?? []} loadingTrainingRequests={loadingActiveTrainingRequests} />

                        <CAVTrainingHistoryPartial trainingData={trainingData} />
                    </>
                }
            />
        </>
    );
}
