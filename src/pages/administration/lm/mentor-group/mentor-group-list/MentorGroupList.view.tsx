import {useNavigate} from "react-router-dom";
import {TableColumn} from "react-data-table-component";
import {PageHeader} from "../../../../../components/ui/PageHeader/PageHeader";
import {Table} from "../../../../../components/ui/Table/Table";
import MentorGroupListTypes from "./_types/MentorGroupList.types";
import {MentorGroupModel} from "../../../../../models/MentorGroup.model";
import MentorGroupAdministrationService from "../../../../../services/mentor-group/MentorGroup.admin.service";
import {Card} from "../../../../../components/ui/Card/Card";

export function MentorGroupListView() {
    const navigate = useNavigate();

    const { mentorGroups, loading } = MentorGroupAdministrationService.getEditableMentorGroups();
    const trainingTypesColumns: (TableColumn<MentorGroupModel> & { searchable?: boolean })[] = MentorGroupListTypes.getColumns(navigate);

    return (
        <>
            <PageHeader title={"Mentorengruppen Verwalten"} hideBackLink />

            <Card>
                <Table searchable paginate loading={loading} columns={trainingTypesColumns} data={mentorGroups} />
            </Card>
        </>
    );
}
