import { PageHeader } from "../../../../components/ui/PageHeader/PageHeader";
import TrainingSessionService from "../../../../services/training-session/TrainingSessionService";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../../../components/ui/Card/Card";
import { Input } from "../../../../components/ui/Input/Input";
import { TbCalendarEvent, TbDoorExit, TbId, TbListCheck, TbRadar, TbUsers } from "react-icons/all";
import React, { useState } from "react";
import StringHelper from "../../../../utils/helper/StringHelper";
import dayjs from "dayjs";
import { Config } from "../../../../core/Config";
import { Separator } from "../../../../components/ui/Separator/Separator";
import { Button } from "../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../assets/theme.config";
import { RenderIf } from "../../../../components/conditionals/RenderIf";
import { TPVWithdrawModal } from "./_modals/TPVWithdraw.modal";

export function PlannedTrainingView() {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const { trainingSession } = TrainingSessionService.getSessionByUUID(uuid);

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);

    return (
        <>
            <PageHeader title={"Geplante Session Verwalten"} />

            <Card>
                <Input labelSmall label={"UUID"} preIcon={<TbId size={20} />} disabled value={trainingSession?.uuid} />

                <Input
                    labelSmall
                    className={"mt-5"}
                    label={"Zuletzt aktualisiert (UTC)"}
                    preIcon={<TbCalendarEvent size={20} />}
                    disabled
                    value={dayjs.utc(trainingSession?.updatedAt).format(Config.DATETIME_FORMAT)}
                />

                <Separator />

                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                    <Input labelSmall preIcon={<TbId size={20} />} label={"Kurs Name"} disabled value={trainingSession?.course?.name} />
                    <Input
                        labelSmall
                        preIcon={<TbId size={20} />}
                        label={"Training Typ"}
                        disabled
                        value={`${trainingSession?.training_type?.name} (${StringHelper.capitalize(trainingSession?.training_type?.type)})`}
                    />
                    <Input
                        labelSmall
                        preIcon={<TbRadar size={20} />}
                        label={"Station"}
                        disabled
                        value={`${trainingSession?.training_station?.callsign} (${trainingSession?.training_station?.frequency?.toFixed(3)})`}
                    />
                    <Input
                        labelSmall
                        preIcon={<TbCalendarEvent size={20} />}
                        label={"Datum"}
                        disabled
                        value={dayjs.utc(trainingSession?.date).format(Config.DATETIME_FORMAT)}
                    />
                </div>

                <Separator />

                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                    <Input
                        labelSmall
                        preIcon={<TbListCheck size={20} />}
                        label={"Mentor"}
                        disabled
                        value={`${trainingSession?.mentor?.first_name} ${trainingSession?.mentor?.last_name} (${trainingSession?.mentor?.id})`}
                    />
                    <Input labelSmall preIcon={<TbUsers size={20} />} label={"Teilnehmer"} disabled value={trainingSession?.users?.length.toString() ?? "0"} />

                    <RenderIf
                        truthValue={trainingSession?.training_type?.type == "cpt"}
                        elementTrue={
                            <>
                                <Input
                                    labelSmall
                                    preIcon={<TbId size={20} />}
                                    label={"CPT Prüfer"}
                                    disabled
                                    value={`${trainingSession?.cpt_examiner?.first_name} ${trainingSession?.cpt_examiner?.last_name} (${trainingSession?.cpt_examiner?.id})`}
                                />
                                <Input
                                    labelSmall
                                    preIcon={<TbId size={20} />}
                                    label={"ATSIM Test Bestanden"}
                                    disabled
                                    value={trainingSession?.cpt_atsim_passed ? "Ja" : "Nein"}
                                />
                            </>
                        }
                    />
                </div>

                <Separator />

                <Button
                    variant={"twoTone"}
                    loading={submitting}
                    onClick={() => setShowWithdrawModal(true)}
                    color={COLOR_OPTS.DANGER}
                    icon={<TbDoorExit size={20} />}>
                    Abmelden
                </Button>
            </Card>

            <TPVWithdrawModal
                show={showWithdrawModal}
                onClose={() => setShowWithdrawModal(false)}
                setSubmitting={setSubmitting}
                submitting={submitting}
                trainingSession={trainingSession}
            />
        </>
    );
}
