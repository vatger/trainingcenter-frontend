import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Table } from "@/components/ui/Table/Table";
import { Card } from "@/components/ui/Card/Card";
import useApi from "@/utils/hooks/useApi";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import TSLListTypes from "@/pages/administration/atd/training-station/training-station-list/_types/TSLList.types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button/Button";
import { Separator } from "@/components/ui/Separator/Separator";
import { COLOR_OPTS } from "@/assets/theme.config";
import { TbRefresh } from "react-icons/tb";

export function TrainingStationListView() {
    const navigate = useNavigate();

    const { data: trainingStations, loading: loadingTrainingStations } = useApi<TrainingStationModel[]>({
        url: "/administration/training-station",
        method: "get",
    });

    return (
        <>
            <PageHeader title={"Trainingsstationen Verwalten"} hideBackLink />

            <Card>
                <Table paginate searchable columns={TSLListTypes.getColumns(navigate)} data={trainingStations ?? []} loading={loadingTrainingStations} />
            </Card>
        </>
    );
}
