import {Card} from "@/components/ui/Card/Card";
import {Table} from "@/components/ui/Table/Table";
import {PageHeader} from "@/components/ui/PageHeader/PageHeader";
import TrainingSessionAdminService from "@/services/training-session/TrainingSessionAdminService";
import MTLListTypes from "@/pages/administration/mentor/training-session/trainining-planned-list/_types/MTLList.types";
import {useNavigate} from "react-router-dom";

export function MentorTrainingListView() {
    const navigate = useNavigate();
    const {trainingSessions, loading} = TrainingSessionAdminService.getPlanned();

    return (
        <>
            <PageHeader title={"Geplante Trainings"} hideBackLink/>

            <Card>
                <Table paginate columns={MTLListTypes.getColumns(navigate)} data={trainingSessions} loading={loading}/>
            </Card>
        </>
    )
}