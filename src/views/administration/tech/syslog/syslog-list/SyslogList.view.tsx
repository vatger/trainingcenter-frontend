import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { Table } from "../../../../../components/ui/Table/Table";
import { TableColumn } from "react-data-table-component";
import { SystemlogModel } from "../../../../../models/Systemlog.model";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import SyslogListTypes from "./_types/SyslogList.types";
import SyslogAdminService from "../../../../../services/syslog/Syslog.admin.service";
import { Card } from "../../../../../components/ui/Card/Card";

export function SyslogListView() {
    const navigate = useNavigate();
    const { systemLogs, loading } = SyslogAdminService.getAll();

    const columns: TableColumn<SystemlogModel>[] = SyslogListTypes.getColumns(navigate);

    return (
        <>
            <PageHeader title={"Systemlogs"} hideBackLink />

            <Card>
                <Table loading={loading} columns={columns} data={systemLogs} />
            </Card>
        </>
    );
}
