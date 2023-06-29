import TrainingRequestService from "../../../../services/training-request/TrainingRequestService";
import { PageHeader } from "../../../../components/ui/PageHeader/PageHeader";
import { Card } from "../../../../components/ui/Card/Card";
import PlannedTrainingListTypes from "./_types/TPLList.types";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../../components/ui/Table/Table";

export function PlannedTrainingListView() {
    const navigate = useNavigate();
    const { sessions, loading: loadingSessions } = TrainingRequestService.getPlanned();

    const columns = PlannedTrainingListTypes.getColumns(navigate);

    return (
        <>
            <PageHeader title={"Geplante Trainings"} hideBackLink />

            <Card>
                <Table paginate columns={columns} data={sessions} loading={loadingSessions} />
            </Card>
        </>
    );
}
