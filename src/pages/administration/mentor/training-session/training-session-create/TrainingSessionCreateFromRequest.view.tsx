import { Card } from "@/components/ui/Card/Card";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { useParams } from "react-router-dom";
import TrainingRequestAdminService from "@/services/training-request/TrainingRequestAdminService";
import { Input } from "@/components/ui/Input/Input";
import { TbCalendarEvent, TbCalendarPlus, TbId, TbUser } from "react-icons/all";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "@/components/ui/Table/Table";
import { Separator } from "@/components/ui/Separator/Separator";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { UserModel } from "@/models/UserModel";
import TSCParticipantListTypes from "@/pages/administration/mentor/training-session/training-session-create/_types/TSCParticipantList.types";
import UserAdminService from "@/services/user/UserAdminService";
import ToastHelper from "@/utils/helper/ToastHelper";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { TrainingSessionCreateSkeleton } from "@/pages/administration/mentor/training-session/training-session-create/_skeletons/TrainingSessionCreate.skeleton";
import TrainingSessionAdminService from "@/services/training-session/TrainingSessionAdminService";

/**
 * Creates a new training session based on a training request. It loads all initial data and allows the mentor to add more people at will
 * @constructor
 */
export function TrainingSessionCreateFromRequestView() {
    const { uuid: courseUUID } = useParams();
    const { trainingRequest, loading } = TrainingRequestAdminService.getByUUID(courseUUID);

    const [submitting, setSubmitting] = useState<boolean>(false);

    const [participants, setParticipants] = useState<UserModel[]>([]);
    const [date, setDate] = useState<string>(dayjs().utc().format("YYYY-MM-DD HH:mm"));

    const [newParticipantID, setNewParticipantID] = useState<string>("");
    const [loadingUser, setLoadingUser] = useState<boolean>(false);

    useEffect(() => {
        if (trainingRequest != null && !loading && trainingRequest.user != null) {
            let p = [...participants];
            p.push(trainingRequest.user);
            setParticipants(p);
        }
    }, [trainingRequest]);

    function addUser() {
        if (participants.find(u => u.id == Number(newParticipantID)) || newParticipantID.length < 4) {
            return;
        }

        setLoadingUser(true);
        UserAdminService.getUserBasicDetails(newParticipantID)
            .then(res => {
                let p = [...participants];
                const user = res.data as UserModel;
                p.push(user);
                setParticipants(p);
            })
            .catch(() => {
                ToastHelper.error(`Fehler beim laden des Benutzers ${newParticipantID}`);
            })
            .finally(() => setLoadingUser(false));
    }

    function createSession() {
        setSubmitting(true);
        TrainingSessionAdminService.createTrainingSession(participants, trainingRequest?.course?.uuid, trainingRequest?.training_type_id, date)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                ToastHelper.error("Fehler beim Erstellen der Session");
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <>
            <PageHeader title={"Trainingssession Erstellen"} />

            <RenderIf
                truthValue={loading}
                elementTrue={<TrainingSessionCreateSkeleton />}
                elementFalse={
                    <>
                        <Card header={"Training"} headerBorder>
                            <div className={"grid grid-cols-2 gap-5"}>
                                <Input label={"Kurs"} labelSmall preIcon={<TbId size={20} />} disabled readOnly value={trainingRequest?.course?.name} />
                                <Input
                                    label={"Trainingstyp"}
                                    labelSmall
                                    preIcon={<TbId size={20} />}
                                    disabled
                                    readOnly
                                    value={`${trainingRequest?.training_type?.name} (${trainingRequest?.training_type?.type})`}
                                />
                            </div>
                            <Input
                                className={"mt-5"}
                                label={"Datum (UTC)"}
                                type={"datetime-local"}
                                labelSmall
                                preIcon={<TbCalendarEvent size={20} />}
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                            />

                            <Separator />

                            <Button variant={"twoTone"} loading={submitting} color={COLOR_OPTS.PRIMARY} icon={<TbCalendarPlus size={20} />} onClick={createSession}>
                                Session Erstellen
                            </Button>
                        </Card>

                        <Card header={"Teilnehmer"} headerBorder className={"mt-5"}>
                            <Input
                                onChange={e => setNewParticipantID(e.target.value)}
                                label={"Benutzer Hinzufügen"}
                                description={"Benutzer, die nicht in diesem Kurs eingeschrieben sind werden nicht berücksichtigt und der Session entsprechend nicht hinzugefügt."}
                                labelSmall
                                preIcon={<TbUser size={20} />}
                                placeholder={participants[0]?.id.toString() ?? "1373921"}
                            />

                            <Button
                                size={SIZE_OPTS.SM}
                                color={COLOR_OPTS.PRIMARY}
                                loading={loadingUser}
                                disabled={submitting}
                                variant={"twoTone"}
                                className={"mt-3"}
                                onClick={e => addUser()}>
                                Hinzufügen
                            </Button>

                            <Separator />

                            <Table paginate columns={TSCParticipantListTypes.getColumns(participants, setParticipants)} data={participants} />
                        </Card>
                    </>
                }
            />
        </>
    );
}
