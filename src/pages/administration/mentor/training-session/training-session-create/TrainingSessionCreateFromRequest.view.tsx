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

/**
 * Creates a new training session based on a training request. It loads all initial data and allows the mentor to add more people at will
 * @constructor
 */
export function TrainingSessionCreateFromRequestView() {
    const { uuid } = useParams();
    const { trainingRequest, loading } = TrainingRequestAdminService.getByUUID(uuid);

    const [participants, setParticipants] = useState<UserModel[]>([]);

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
        setLoadingUser(true);
        UserAdminService.getUserBasicDetails(newParticipantID)
            .then(res => {
                let p = [...participants];
                const user = res.data as UserModel;
                if (p.find(u => u.id == user.id)) {
                    return;
                }
                p.push(user);
                setParticipants(p);
            })
            .catch(() => {
                ToastHelper.error(`Fehler beim laden des Benutzers ${newParticipantID}`);
            })
            .finally(() => setLoadingUser(false));
    }

    return (
        <>
            <PageHeader title={"Training Session Erstellen"} />

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
                                label={"Datum"}
                                type={"datetime-local"}
                                labelSmall
                                preIcon={<TbCalendarEvent size={20} />}
                                value={dayjs().utc().format("YYYY-MM-DD HH:mm")}
                            />

                            <Separator />

                            <Button variant={"twoTone"} color={COLOR_OPTS.PRIMARY} icon={<TbCalendarPlus size={20} />}>
                                Session Erstellen
                            </Button>
                        </Card>

                        <Card header={"Teilnehmer"} headerBorder className={"mt-5"}>
                            <Input
                                onChange={e => setNewParticipantID(e.target.value)}
                                label={"Benutzer Hinzufügen"}
                                labelSmall
                                preIcon={<TbUser size={20} />}
                                placeholder={participants[0]?.id.toString() ?? "1373921"}
                            />

                            <Button
                                size={SIZE_OPTS.SM}
                                color={COLOR_OPTS.PRIMARY}
                                loading={loadingUser}
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
