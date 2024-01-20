import useApi from "@/utils/hooks/useApi";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import { Table } from "@/components/ui/Table/Table";
import ACPTTypes from "@/pages/administration/atd/atd-examiner/available-cpt/_types/ACPT.types";
import { Card } from "@/components/ui/Card/Card";
import AllCPTTypes from "@/pages/administration/atd/atd-examiner/all-cpt/_types/AllCPT.types";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";

export function AllCPTView() {
    const { data, loading, setData } = useApi<TrainingSessionModel[]>({
        url: "/administration/cpt/",
        method: "get",
    });

    return (
        <>
            <PageHeader title={"CPT Übersicht"} hideBackLink />

            <Card>
                <Table
                    columns={AllCPTTypes.getColumns(data, setData)}
                    paginate
                    data={data?.sort((a, b) => (a.date > b.date ? -1 : 1)) ?? []}
                    loading={loading}
                />
            </Card>
        </>
    );
}
