import useApi from "@/utils/hooks/useApi";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Card } from "@/components/ui/Card/Card";
import { Table } from "@/components/ui/Table/Table";
import MECPTTypes from "@/pages/administration/atd/atd-examiner/my-cpt/_types/MECPT.types";

export function MyCPTListView() {
    const {
        data: myCPTs,
        loading: loadingMyCPTs,
        setData: setMyCPTs,
    } = useApi<TrainingSessionModel[]>({
        url: "/administration/cpt/examiner/my",
        method: "get",
    });

    return (
        <>
            <PageHeader title={"Meine CPTs (Prüfer)"} hideBackLink />

            <Card>
                <Table
                    columns={MECPTTypes.getColumns(myCPTs ?? [], setMyCPTs)}
                    defaultSortField={1}
                    defaultSortAsc={false}
                    paginate
                    data={myCPTs?.sort((a, b) => (a.date > b.date ? -1 : 1)) ?? []}
                    loading={loadingMyCPTs}
                />
            </Card>
        </>
    );
}
