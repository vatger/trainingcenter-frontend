import useApi from "@/utils/hooks/useApi";
import { FastTrackRequestModel } from "@/models/FastTrackRequestModel";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Card } from "@/components/ui/Card/Card";
import { Table } from "@/components/ui/Table/Table";
import FTLTypes from "@/pages/administration/atd/fast-track/_types/FTL.types";

export function FastTrackListAllView() {
    const { data: fastTrackRequests, loading: loadingFastTrackRequests } = useApi<FastTrackRequestModel[]>({
        url: "/administration/fast-track",
        method: "get",
    });

    return (
        <>
            <PageHeader title={"Fast-Track Anfragen"} hideBackLink />

            <Card headerBorder>
                <Table paginate defaultSortField={4} columns={FTLTypes.getColumns()} data={fastTrackRequests ?? []} loading={loadingFastTrackRequests} />
            </Card>
        </>
    );
}
