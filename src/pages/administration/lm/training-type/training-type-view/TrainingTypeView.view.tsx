import { useParams } from "react-router-dom";
import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import TrainingTypeAdminService from "../../../../../services/training-type/TrainingTypeAdminService";
import { Card } from "../../../../../components/ui/Card/Card";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import React from "react";
import { TTSkeleton } from "../_skeletons/TT.skeleton";
import { Tabs } from "../../../../../components/ui/Tabs/Tabs";
import { TTVSettingsSubpage } from "./_subpages/TTVSettings.subpage";
import { TTVTrainingStationsSubpage } from "./_subpages/TTVTrainingStations.subpage";

const tabHeaders = ["Einstellungen", "Trainingsstationen"];

export function TrainingTypeViewView() {
    const { id } = useParams();

    const { trainingType, setTrainingType, loading } = TrainingTypeAdminService.getByID(id);

    return (
        <>
            <PageHeader title={"Trainingstyp Verwalten"} />

            <RenderIf
                truthValue={loading}
                elementTrue={<TTSkeleton />}
                elementFalse={
                    <Card>
                        <Tabs type={"underline"} tabHeaders={tabHeaders}>
                            <TTVSettingsSubpage loading={loading} trainingType={trainingType} setTrainingType={setTrainingType} />
                            <TTVTrainingStationsSubpage loading={loading} trainingType={trainingType} setTrainingType={setTrainingType} />
                        </Tabs>
                    </Card>
                }
            />
        </>
    );
}
