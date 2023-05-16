import {useParams} from "react-router-dom";
import {PageHeader} from "../../../../../components/ui/PageHeader/PageHeader";
import TrainingTypeAdminService from "../../../../../services/training-type/TrainingType.admin.service";
import {Card} from "../../../../../components/ui/Card/Card";
import {RenderIf} from "../../../../../components/conditionals/RenderIf";
import React from "react";
import {TrainingTypeViewSkeleton} from "../_skeletons/TrainingTypeView.skeleton";
import {Tabs} from "../../../../../components/ui/Tabs/Tabs";
import {TrainingTypeViewSettingsSubpage} from "./_subpages/TrainingTypeViewSettings.subpage";
import {TrainingTypeViewTrainingStationsSubpage} from "./_subpages/TrainingTypeViewTrainingStations.subpage";

const tabHeaders = ["Einstellungen", "Trainingsstationen"];

export function TrainingTypeViewView() {
    const { id } = useParams();

    const { trainingType, setTrainingType, loading } = TrainingTypeAdminService.getByID(id);

    return (
        <>
            <PageHeader title={"Trainingstyp Verwalten"} />

            <RenderIf
                truthValue={loading}
                elementTrue={<TrainingTypeViewSkeleton />}
                elementFalse={
                    <Card>
                        <Tabs type={"underline"} tabHeaders={tabHeaders}>
                            <TrainingTypeViewSettingsSubpage loading={loading} trainingType={trainingType} setTrainingType={setTrainingType} />
                            <TrainingTypeViewTrainingStationsSubpage loading={loading} trainingType={trainingType} setTrainingType={setTrainingType} />
                        </Tabs>
                    </Card>
                }
            />
        </>
    );
}
