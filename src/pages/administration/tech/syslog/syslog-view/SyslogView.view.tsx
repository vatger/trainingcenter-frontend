import {PageHeader} from "../../../../../components/ui/PageHeader/PageHeader";
import SyslogAdminService from "../../../../../services/syslog/Syslog.admin.service";
import {useParams} from "react-router-dom";
import {Card} from "../../../../../components/ui/Card/Card";
import {Input} from "../../../../../components/ui/Input/Input";
import React from "react";
import moment from "moment";
import {Badge} from "../../../../../components/ui/Badge/Badge";
import {COLOR_OPTS} from "../../../../../assets/theme.config";

export function SyslogViewView() {
    const { id } = useParams();
    const { systemLog, loading, loadingError } = SyslogAdminService.getInformationByID(id);

    return (
        <>
            <PageHeader title={`Systemlog Ansehen`} />

            <Card
                header={"Informationen"}
                headerBorder
                headerExtra={
                    <Badge color={COLOR_OPTS.PRIMARY}>
                        <># {id}</>
                    </Badge>
                }>
                <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"}>
                    <Input label={"Benutzer"} disabled value={systemLog?.user_id ?? "N/A"} />

                    <Input label={"Methode"} disabled value={systemLog?.method} />

                    <Input label={"Request IP"} disabled value={systemLog?.remote_addr} />
                </div>

                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                    <Input className={"mt-5"} label={"Datum (UTC)"} disabled value={moment(systemLog?.createdAt).utc().format("DD.MM.YYYY HH:mm:ss")} />

                    <Input className={"mt-5"} label={"Pfad"} disabled value={systemLog?.path} />
                </div>
            </Card>
        </>
    );
}
