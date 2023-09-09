import { Card } from "@/components/ui/Card/Card";
import { Table } from "@/components/ui/Table/Table";
import LTLListTypes from "@/pages/administration/atd/log-template/log-template-list/_types/LTLList.types";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import useApi from "@/utils/hooks/useApi";
import { TrainingLogTemplateModel } from "@/models/TrainingLogTemplateModel";

export function LogTemplateListView() {
    const navigate = useNavigate();

    const { data: trainingLogTemplates, loading: loadingTrainingLogTemplates } = useApi<TrainingLogTemplateModel[]>({
        url: "/administration/training-log/template",
        method: "get",
    });

    return (
        <>
            <PageHeader title={"Logvorlagen Verwalten"} hideBackLink />

            <Card>
                <Table
                    paginate
                    searchable
                    columns={LTLListTypes.getColumns(navigate)}
                    data={trainingLogTemplates ?? []}
                    loading={loadingTrainingLogTemplates}
                />
            </Card>
        </>
    );
}
