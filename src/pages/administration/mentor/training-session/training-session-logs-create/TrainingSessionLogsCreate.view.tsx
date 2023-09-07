import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogTemplateElement } from "@/pages/administration/atd/log-template/log-template-create/_types/LTCElement.types";
import { MapArray } from "@/components/conditionals/MapArray";
import { Card } from "@/components/ui/Card/Card";
import { UserModel } from "@/models/UserModel";
import { TSLCLogTemplateElementPartial } from "@/pages/administration/mentor/training-session/training-session-logs-create/_partials/TSLCLogTemplateElement.partial";
import useApi from "@/utils/hooks/useApi";
import { TrainingLogTemplateModel } from "@/models/TrainingLogTemplateModel";
import { generateUUID } from "@/utils/helper/UUIDHelper";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS } from "@/assets/theme.config";
import { TbPlus } from "react-icons/all";
import TrainingSessionService from "@/services/USE_THIS_LATER/TrainingSessionService";
import { TrainingTypeModel } from "@/models/TrainingTypeModel";

export type ParticipantStatus = {
    user_id: number;
    stringValues: Map<string, string>;
    progressValues: Map<string, number>;
    passed: boolean;
    visible: boolean;
    nextTraining: number;
};

export function TrainingSessionLogsCreateView() {
    const { uuid } = useParams();
    const navigate = useNavigate();

    const { data: participants, loading: loadingParticipants } = useApi<UserModel[]>({
        url: `/administration/training-session/participants/${uuid}`,
        method: "get",
    });
    const { data: logTemplate, loading: loadingLogTemplate } = useApi<TrainingLogTemplateModel>({
        url: `/administration/training-session/log-template/${uuid}`,
        method: "get",
    });
    const { data: courseTrainingTypes, loading: loadingCourseTrainingTypes } = useApi<TrainingTypeModel[]>({
        url: `/administration/training-session/training-types/${uuid}`,
        method: "get",
    });

    const [logTemplateElements, setLogTemplateElements] = useState<(LogTemplateElement & { uuid: string })[]>([]);
    const [participantValues, setParticipantValues] = useState<ParticipantStatus[] | undefined>(undefined);

    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (!loadingLogTemplate && logTemplate != null) {
            let logTemplates = logTemplate.content as LogTemplateElement[];
            const logTemplatesWithUUID = logTemplates.map(l => {
                return { ...l, uuid: generateUUID() };
            });

            setLogTemplateElements(logTemplatesWithUUID);
            return;
        }

        if (!loadingLogTemplate) {
            setLogTemplateElements([{ uuid: generateUUID(), type: "textarea", title: "Bewertung" }]);
        }
    }, [loadingLogTemplate]);

    useEffect(() => {
        if (participants == null || loadingParticipants) {
            return;
        }

        let arr: ParticipantStatus[] = [];
        for (let i = 0; i < participants?.length; i++) {
            arr.push({
                user_id: participants[i].id,
                stringValues: new Map<string, string>(),
                progressValues: new Map<string, number>(),
                passed: true,
                visible: true,
                nextTraining: -1,
            });
        }

        setParticipantValues(arr);
    }, [loadingParticipants]);

    return (
        <>
            <PageHeader title={"Logs Erstellen"} />

            <RenderIf
                truthValue={!loadingParticipants && !loadingLogTemplate && participantValues != null}
                elementTrue={
                    <MapArray
                        data={participants ?? []}
                        mapFunction={(user: UserModel, index) => {
                            return (
                                <Card key={index} className={index > 0 ? "mt-5" : ""} header={`${user.first_name} ${user.last_name} (${user.id})`} headerBorder>
                                    <MapArray
                                        data={logTemplateElements ?? []}
                                        mapFunction={(v, i) => {
                                            return (
                                                <TSLCLogTemplateElementPartial
                                                    element={v}
                                                    index={i}
                                                    key={i}
                                                    availableTrainingTypes={courseTrainingTypes ?? []}
                                                    stringValues={participantValues![index].stringValues}
                                                    progressValues={participantValues![index].progressValues}
                                                    onPassedValueChange={e => {
                                                        participantValues![index].passed = e;
                                                    }}
                                                    onVisibilityValueChange={e => {
                                                        participantValues![index].visible = e;
                                                    }}
                                                    onNextTrainingValueChange={e => {
                                                        if (isNaN(e) || e == -1) {
                                                            return;
                                                        }

                                                        participantValues![index].nextTraining = e;
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                </Card>
                            );
                        }}
                    />
                }
            />

            <RenderIf
                truthValue={participants != null && participants?.length > 0}
                elementTrue={
                    <Card className={"mt-5"} header={"Abschließen"} headerBorder>
                        <Button
                            color={COLOR_OPTS.PRIMARY}
                            variant={"twoTone"}
                            icon={<TbPlus size={20} />}
                            onClick={() => {
                                TrainingSessionService.SubmitTrainingLogs({
                                    uuid: uuid ?? "-1",
                                    participants: participants,
                                    setSubmitting: setSubmitting,
                                    navigate: navigate,
                                    logTemplateElements: logTemplateElements,
                                    participantValues: participantValues,
                                });
                            }}
                            loading={submitting}>
                            Logs Erstellen
                        </Button>
                    </Card>
                }
            />
        </>
    );
}
