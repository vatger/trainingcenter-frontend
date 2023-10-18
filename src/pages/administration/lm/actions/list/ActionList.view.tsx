import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Table } from "@/components/ui/Table/Table";
import { Card } from "@/components/ui/Card/Card";
import useApi from "@/utils/hooks/useApi";
import { ActionRequirementModel } from "@/models/CourseModel";
import ALTypes from "@/pages/administration/lm/actions/list/_types/AL.types";
import { useNavigate } from "react-router-dom";

export function ActionListView() {
    const navigate = useNavigate();

    const { loading: loadingActionRequirements, data: actionRequirements } = useApi<ActionRequirementModel[]>({
        url: "administration/action-requirement",
        method: "get",
    });

    return (
        <>
            <PageHeader title={"Aktionen / Bedingungen Verwalten"} hideBackLink />

            <Card>
                <Table
                    searchable
                    loading={loadingActionRequirements}
                    columns={ALTypes.getActionRequirementTableColumns(navigate)}
                    data={actionRequirements ?? []}
                />
            </Card>
        </>
    );
}
