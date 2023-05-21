import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { Table } from "../../../../../components/ui/Table/Table";
import { TableColumn } from "react-data-table-component";
import { SyslogModel } from "../../../../../models/SyslogModel";
import { useNavigate } from "react-router-dom";
import SyslogListTypes from "./_types/SyslogList.types";
import SyslogAdminService from "../../../../../services/syslog/SyslogAdminService";
import { Card } from "../../../../../components/ui/Card/Card";

export function SyslogListView() {
    const navigate = useNavigate();
    const { systemLogs, loading } = SyslogAdminService.getAll();

    const columns: TableColumn<SyslogModel>[] = SyslogListTypes.getColumns(navigate);

    return (
        <>
            <PageHeader title={"Systemlogs"} hideBackLink />

            <Card>
                <Table loading={loading} columns={columns} data={systemLogs} />
            </Card>
        </>
    );
}
