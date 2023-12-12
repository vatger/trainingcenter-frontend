import useApi from "@/utils/hooks/useApi";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import { Table } from "@/components/ui/Table/Table";
import ACPTTypes from "@/pages/administration/atd/atd-examiner/available-cpt/_types/ACPT.types";
import { Card } from "@/components/ui/Card/Card";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";

export function AvailableCPTView() {
    const { data: availableCPTs, loading: loadingAvailableCPTs } = useApi<TrainingSessionModel[]>({
        url: "/administration/cpt/available",
        method: "get",
    });

    return (
        <>
            <PageHeader title={"Offene CPTs (Prüfer)"} hideBackLink />

            <Card>
                <Table
                    columns={ACPTTypes.getColumns()}
                    paginate
                    data={availableCPTs?.sort((a, b) => (a.date > b.date ? -1 : 1)) ?? []}
                    loading={loadingAvailableCPTs}
                />
            </Card>
        </>
    );
}
