import { PageHeader } from "../../../../components/ui/PageHeader/PageHeader";
import { Card } from "../../../../components/ui/Card/Card";
import { Table } from "../../../../components/ui/Table/Table";
import TrainingOpenRequestListTypes from "./_types/TORLList.types";
import TrainingRequestService from "../../../../services/training-request/TrainingRequestService";
import { useNavigate } from "react-router-dom";

export function TrainingOpenRequestListView() {
    const navigate = useNavigate();
    const columns = TrainingOpenRequestListTypes.getColumns(navigate);

    const { openTrainingRequests, loading } = TrainingRequestService.getOpen();

    return (
        <>
            <PageHeader title={"Offene Trainingsanfragen"} hideBackLink />

            <Card>
                <Table loading={loading} columns={columns} data={openTrainingRequests} />
            </Card>
        </>
    );
}
