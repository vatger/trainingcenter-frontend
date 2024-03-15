import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import React from "react";
import { getAtcRatingLong, getAtcRatingShort } from "@/utils/helper/vatsim/AtcRatingHelper";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS } from "@/assets/theme.config";
import generalTranslation from "@/assets/lang/generic.translation";
import { useUserSelector } from "@/app/features/authSlice";
import { useSettingsSelector } from "@/app/features/settingsSlice";
import useApi from "@/utils/hooks/useApi";
import { RatingTimesPartial } from "@/pages/authenticated/overview/_partials/RatingTimes.partial";

export function Overview() {
    const user = useUserSelector();
    const language = useSettingsSelector().language;

    const {
        data: ratingTimes,
        loading: loadingRatingTimes,
        loadingError,
    } = useApi<any>({
        url: "/statistics/rating-times",
        method: "get",
    });

    const { data: trainingSessionCount, loading: loadingTrainingSessionCount } = useApi<{ count: number }>({
        url: "/statistics/training-session-count",
        method: "get",
    });

    return (
        <>
            <PageHeader title={"VATSIM Germany Trainingcenter"} hideBackLink />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="card card-border rounded-md hover:shadow transition-shadow" role="presentation">
                    <div className="card-body">
                        <h6 className="font-semibold mb-4 text-sm">ATC Rating</h6>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">
                                    <span>
                                        {getAtcRatingLong(user?.user_data?.rating_atc ?? -1)} ({getAtcRatingShort(user?.user_data?.rating_atc ?? -1)})
                                    </span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card card-border rounded-md hover:shadow transition-shadow" role="presentation">
                    <div className="card-body">
                        <h6 className="font-semibold mb-4 text-sm">Subdivision</h6>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">
                                    <span>{user?.user_data?.subdivision_code}</span>
                                </h4>
                            </div>
                            <RenderIf
                                truthValue={user?.user_data?.subdivision_code?.toLowerCase() != "ger"}
                                elementTrue={<Badge color={COLOR_OPTS.PRIMARY}>{generalTranslation.guest[language]}</Badge>}
                            />
                        </div>
                    </div>
                </div>

                <div className="card card-border rounded-md hover:shadow transition-shadow" role="presentation">
                    <div className="card-body">
                        <h6 className="font-semibold mb-4 text-sm">Training Sessions</h6>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">
                                    <span>{trainingSessionCount?.count}</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RatingTimesPartial data={ratingTimes} loading={loadingRatingTimes} loadingError={loadingError} />
        </>
    );
}
