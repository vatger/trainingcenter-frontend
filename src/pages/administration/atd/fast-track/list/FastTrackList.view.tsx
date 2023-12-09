import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import useApi from "@/utils/hooks/useApi";
import { FastTrackRequestModel } from "@/models/FastTrackRequestModel";
import { Table } from "@/components/ui/Table/Table";
import { Card } from "@/components/ui/Card/Card";
import FTLTypes from "@/pages/administration/atd/fast-track/list/_types/FTL.types";

export function FastTrackListView() {
    const { data: fastTrackRequests, loading: loadingFastTrackRequests } = useApi<FastTrackRequestModel[]>({
        url: "/administration/fast-track/pending",
        method: "get",
    });

    return (
        <>
            <PageHeader title={"Fast-Track Anfragen"} hideBackLink />

            <Card headerBorder>
                <Table paginate defaultSortField={1} columns={FTLTypes.getColumns()} data={fastTrackRequests ?? []} loading={loadingFastTrackRequests} />
            </Card>
        </>
    );
}
