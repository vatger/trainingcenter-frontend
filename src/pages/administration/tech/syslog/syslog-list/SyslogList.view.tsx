import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Table } from "@/components/ui/Table/Table";
import { TableColumn } from "react-data-table-component";
import { SyslogModel } from "@/models/SyslogModel";
import { useNavigate } from "react-router-dom";
import SyslogListTypes from "./_types/SL.types";
import { Card } from "@/components/ui/Card/Card";
import useApi from "@/utils/hooks/useApi";

export function SyslogListView() {
    const navigate = useNavigate();
    const { data: systemLogs, loading } = useApi<SyslogModel[]>({
        url: `/administration/syslog`,
        method: "get",
    });

    const columns: TableColumn<SyslogModel>[] = SyslogListTypes.getColumns(navigate);

    return (
        <>
            <PageHeader title={"Systemlogs"} hideBackLink />

            <Card>
                <Table loading={loading} columns={columns} data={systemLogs ?? []} />
            </Card>
        </>
    );
}
