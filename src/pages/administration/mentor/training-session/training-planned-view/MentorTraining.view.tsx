import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Card } from "@/components/ui/Card/Card";
import { Input } from "@/components/ui/Input/Input";
import { TbCalendarEvent, TbClipboardPlus, TbId } from "react-icons/tb";
import dayjs from "dayjs";
import { Select } from "@/components/ui/Select/Select";
import { MapArray } from "@/components/conditionals/MapArray";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import TrainingSessionAdminService from "@/services/training-session/TrainingSessionAdminService";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS } from "@/assets/theme.config";
import { TbRefresh } from "react-icons/tb";
import { Separator } from "@/components/ui/Separator/Separator";
import FormHelper from "@/utils/helper/FormHelper";
import { RenderIf } from "@/components/conditionals/RenderIf";
import ToastHelper from "@/utils/helper/ToastHelper";
import { UserModel } from "@/models/UserModel";
import { Table } from "@/components/ui/Table/Table";
import TPVParticipantListTypes from "@/pages/administration/mentor/training-session/training-planned-view/_types/TPVParticipantList.types";
import useApi from "@/utils/hooks/useApi";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";

export function MentorTrainingView() {
    const navigate = useNavigate();
    const { uuid } = useParams();

    const { data: trainingSession, loading } = useApi<TrainingSessionModel>({
        url: `/administration/training-session/${uuid ?? "-1"}`,
        method: "get",
    });

    const [participants, setParticipants] = useState<UserModel[]>([]);
    const [updating, setUpdating] = useState<boolean>(false);

    useEffect(() => {
        if (!loading && trainingSession != undefined) {
            setParticipants(trainingSession.users as UserModel[]);
        }
    }, [loading]);

    function updateSessionDetails(e: FormEvent<HTMLFormElement>) {
        setUpdating(true);
        e.preventDefault();

        const data = FormHelper.getEntries(e.target);

        TrainingSessionAdminService.updateSession(uuid, data)
            .then(res => {
                ToastHelper.success("Session-Informationen erfolgreich aktualisiert");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim aktuelisieren der Session-Informationen");
            })
            .finally(() => setUpdating(false));
    }

    return (
        <>
            <PageHeader title={"Geplantes Training"} />

            <RenderIf
                truthValue={loading}
                elementTrue={<></>}
                elementFalse={
                    <>
                        <Card header={"Training"} headerBorder>
                            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5"}>
                                <Input label={"Kurs"} labelSmall preIcon={<TbId size={20} />} disabled readOnly value={trainingSession?.course?.name} />
                                <Input
                                    label={"Trainingstyp"}
                                    labelSmall
                                    preIcon={<TbId size={20} />}
                                    disabled
                                    readOnly
                                    value={`${trainingSession?.training_type?.name} (${trainingSession?.training_type?.type})`}
                                />
                            </div>
                            <form onSubmit={updateSessionDetails}>
                                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5"}>
                                    <Input
                                        label={"Datum (UTC)"}
                                        type={"datetime-local"}
                                        name={"date"}
                                        labelSmall
                                        preIcon={<TbCalendarEvent size={20} />}
                                        value={dayjs.utc(trainingSession?.date).format("YYYY-MM-DD HH:mm")}
                                    />
                                    <Select
                                        label={"Trainingsstation"}
                                        labelSmall
                                        name={"training_station"}
                                        defaultValue={trainingSession?.training_station?.id}
                                        disabled={
                                            trainingSession?.training_type?.training_stations == null ||
                                            trainingSession.training_type.training_stations.length == 0
                                        }>
                                        <option value={"-1"}>N/A</option>
                                        <MapArray
                                            data={trainingSession?.training_type?.training_stations ?? []}
                                            mapFunction={(trainingStation: TrainingStationModel, index) => {
                                                return (
                                                    <option key={index} value={trainingStation.id}>
                                                        {trainingStation.callsign} ({trainingStation.frequency.toFixed(3)})
                                                    </option>
                                                );
                                            }}
                                        />
                                    </Select>
                                </div>

                                <Separator />

                                <div className={"flex lg:flex-row flex-col gap-3"}>
                                    <Button color={COLOR_OPTS.PRIMARY} variant={"twoTone"} icon={<TbRefresh size={20} />} type={"submit"} loading={updating}>
                                        Aktualisieren
                                    </Button>

                                    <Button
                                        color={COLOR_OPTS.PRIMARY}
                                        variant={"twoTone"}
                                        icon={<TbClipboardPlus size={20} />}
                                        type={"button"}
                                        disabled={updating}
                                        onClick={() => navigate("logs-create")}>
                                        Logs Erstellen
                                    </Button>
                                </div>
                            </form>
                        </Card>
                        <Card header={"Teilnehmer"} headerBorder className={"mt-5"}>
                            <Table paginate columns={TPVParticipantListTypes.getColumns()} data={participants} />
                        </Card>
                    </>
                }
            />
        </>
    );
}
