import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import useApi from "@/utils/hooks/useApi";
import { TrainingLogModel } from "@/models/TrainingSessionBelongsToUser.model";
import { Card } from "@/components/ui/Card/Card";
import { MapArray } from "@/components/conditionals/MapArray";
import { LogTemplateElement } from "@/models/TrainingLogTemplateModel";
import { TLVLogTemplateElementPartial } from "@/pages/authenticated/training/training-log-view/_partials/TLVLogTemplateElement.partial";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { TLVViewSkeleton } from "@/pages/authenticated/training/training-log-view/_skeletons/TLVView.skeleton";

export function TrainingLogViewView() {
    const { uuid } = useParams();

    const { data: trainingLog, loading: loadingTrainingLog } = useApi<TrainingLogModel>({
        url: `/training-log/${uuid}`,
        method: "get",
    });

    return (
        <>
            <PageHeader title={"Trainingslog Ansehen"} />

            <RenderIf
                truthValue={loadingTrainingLog}
                elementTrue={<TLVViewSkeleton />}
                elementFalse={
                    <Card>
                        <MapArray
                            data={(trainingLog?.content ?? []) as LogTemplateElement[]}
                            mapFunction={(t: LogTemplateElement, index: number) => {
                                return <TLVLogTemplateElementPartial element={t} index={index} key={index} />;
                            }}
                        />
                    </Card>
                }
            />
        </>
    );
}
