import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Card } from "@/components/ui/Card/Card";
import useApi from "@/utils/hooks/useApi";
import { EndorsementGroupModel } from "@/models/EndorsementGroupModel";
import { Table } from "@/components/ui/Table/Table";
import EGListTypes from "@/pages/administration/lm/endorsement-group/list/_types/EGList.types";
import { useNavigate } from "react-router-dom";

export function EndorsementGroupListView() {
    const navigate = useNavigate();
    const { loading: loadingEndorsementGroups, data: endorsementGroups } = useApi<EndorsementGroupModel[]>({
        url: "/administration/endorsement-group",
        method: "get",
    });

    return (
        <>
            <PageHeader title={"Freigabegruppen Verwalten"} hideBackLink />

            <Card>
                <Table paginate columns={EGListTypes.getColumns(navigate)} data={endorsementGroups ?? []} loading={loadingEndorsementGroups} />
            </Card>
        </>
    );
}
