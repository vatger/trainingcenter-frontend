import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Card } from "@/components/ui/Card/Card";
import { Table } from "@/components/ui/Table/Table";
import useApi from "@/utils/hooks/useApi";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import CPTLTypes from "@/pages/administration/mentor/cpt/cpt-list/_types/CPTL.types";
import { Alert } from "@/components/ui/Alert/Alert";
import { TYPE_OPTS } from "@/assets/theme.config";
import { useUserSelector } from "@/app/features/authSlice";

export function CPTListView() {
    const user = useUserSelector();

    const {
        data: CPTList,
        loading: loadingCPTList,
        setData: setCPTList,
    } = useApi<TrainingSessionModel[]>({
        url: "/administration/cpt/open",
        method: "get",
    });

    return (
        <>
            <PageHeader title={"CPT Übersicht"} hideBackLink />

            <Card headerBorder header={"Liste der geplanten CPTs"}>
                <Alert type={TYPE_OPTS.INFO} showIcon closeable rounded className={"mb-5"}>
                    Beachte bitte, dass sich hier nur Beisitzer für CPTs anmelden können. Wenn du dich als Prüfer für eines der CPTs anmelden willst, dann gehe
                    bitte in den entsprechenden Bereich im ATD.
                </Alert>

                <Table
                    columns={CPTLTypes.getColumns(user, CPTList, setCPTList)}
                    paginate
                    searchable
                    defaultSortField={1}
                    data={CPTList ?? []}
                    loading={loadingCPTList}
                />
            </Card>
        </>
    );
}
