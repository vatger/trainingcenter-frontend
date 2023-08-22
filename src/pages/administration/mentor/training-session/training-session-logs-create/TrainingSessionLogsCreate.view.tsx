import {PageHeader} from "@/components/ui/PageHeader/PageHeader";
import {useParams} from "react-router-dom";
import TrainingSessionAdminService from "@/services/training-session/TrainingSessionAdminService";
import {useEffect, useState} from "react";
import {LogTemplateElement} from "@/pages/administration/atd/log-template/log-template-create/_types/LTCElement.types";
import {MapArray} from "@/components/conditionals/MapArray";
import {Card} from "@/components/ui/Card/Card";
import {UserModel} from "@/models/UserModel";
import {
    TSLCLogTemplateElementPartial
} from "@/pages/administration/mentor/training-session/training-session-logs-create/_partials/TSLCLogTemplateElement.partial";

export function TrainingSessionLogsCreateView() {
    const {uuid} = useParams();
    const {participants, loading: loadingParticipants} = TrainingSessionAdminService.getParticipants(uuid);
    const {logTemplate, loading: loadingLogTemplate} = TrainingSessionAdminService.getLogTemplate(uuid);

    const [logTemplateElements, setLogTemplateElements] = useState<LogTemplateElement[]>([]);

    useEffect(() => {
        if (!loadingLogTemplate && logTemplate != null) {
            setLogTemplateElements(logTemplate.content as LogTemplateElement[]);
        }
    }, [loadingLogTemplate]);

    return (
        <>
            <PageHeader title={"Logs Erstellen"}/>

            <MapArray data={participants ?? []} mapFunction={(user: UserModel, index) => {
                return (
                    <Card className={index > 0 ? "mt-5" : ""} header={`${user.first_name} ${user.last_name} (${user.id})`} headerBorder>
                        <MapArray data={logTemplateElements ?? []} mapFunction={(v, i) => {
                            return (
                                <TSLCLogTemplateElementPartial element={v} index={i}/>
                            )
                        }}/>
                    </Card>
                )
            }}/>
        </>
    )
}