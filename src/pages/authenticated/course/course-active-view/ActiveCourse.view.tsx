import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
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
import { CourseModel } from "@/models/CourseModel";
import { UserTrainingSessionModel } from "@/models/TrainingSessionModel";
import { Alert } from "@/components/ui/Alert/Alert";
import { TYPE_OPTS } from "@/assets/theme.config";

export function ActiveCourseView() {
    const { uuid } = useParams();
    const [showRequestTrainingModal, setShowRequestTrainingModal] = useState<boolean>(false);

    const {
        data: course,
        loading: loadingCourse,
        loadingError: loadingCourseError,
    } = useApi<CourseModel>({
        url: "/course/info/my",
        method: "get",
        params: {
            uuid: uuid,
        },
    });

    const {
        data: trainingData,
        loading: loadingTrainingData,
        loadingError: loadingTrainingDataError,
    } = useApi<UserTrainingSessionModel[]>({
        url: "/course/info/training",
        method: "get",
        params: {
            uuid: uuid,
        },
    });

    const {
        data: activeTrainingRequests,
        setData: setActiveTrainingRequests,
        loading: loadingActiveTrainingRequests,
        loadingError: loadingActiveTrainingRequestsError,
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
                    <RenderIf
                        truthValue={loadingCourseError != null || loadingTrainingDataError != null || loadingActiveTrainingRequestsError != null}
                        elementTrue={
                            <Alert type={TYPE_OPTS.DANGER} showIcon>
                                Ein Fehler ist beim Laden der Seite aufgetreten. Versuche es bitte erneut
                            </Alert>
                        }
                        elementFalse={
                            <>
                                <CAVInformationPartial
                                    showRequestTrainingModal={showRequestTrainingModal}
                                    setShowRequestTrainingModal={setShowRequestTrainingModal}
                                    setTrainingRequests={setActiveTrainingRequests}
                                    course={course}
                                    loadingCourse={loadingCourse}
                                    trainingRequests={activeTrainingRequests ?? []}
                                />

                                <CAVTrainingRequestsPartial
                                    trainingRequests={activeTrainingRequests ?? []}
                                    loadingTrainingRequests={loadingActiveTrainingRequests}
                                />

                                <CAVTrainingHistoryPartial trainingData={trainingData ?? []} />
                            </>
                        }
                    />
                }
            />
        </>
    );
}
