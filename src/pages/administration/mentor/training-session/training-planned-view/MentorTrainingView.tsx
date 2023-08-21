import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Card } from "@/components/ui/Card/Card";
import { Input } from "@/components/ui/Input/Input";
import { TbCalendarEvent, TbClipboardPlus, TbId, TbLoader, TbTrash } from "react-icons/all";
import dayjs from "dayjs";
import { Select } from "@/components/ui/Select/Select";
import { MapArray } from "@/components/conditionals/MapArray";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import React, { FormEvent, FormEventHandler, useState } from "react";
import TrainingSessionAdminService from "@/services/training-session/TrainingSessionAdminService";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS } from "@/assets/theme.config";
import { TbRefresh } from "react-icons/tb";
import { Separator } from "@/components/ui/Separator/Separator";
import FormHelper from "@/utils/helper/FormHelper";
import { RenderIf } from "@/components/conditionals/RenderIf";
import ToastHelper from "@/utils/helper/ToastHelper";

export function MentorTrainingView() {
    const { uuid } = useParams();
    const { trainingSession, loading } = TrainingSessionAdminService.getByUUID(uuid);

    const [updating, setUpdating] = useState<boolean>(false);

    function updateSessionDetails(e: FormEvent<HTMLFormElement>) {
        setUpdating(true);
        e.preventDefault();

        const data = FormHelper.getEntries(e.target);

        console.log(data);

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
                                        disabled={updating}>
                                        Logs Erstellen
                                    </Button>
                                </div>
                            </form>
                        </Card>
                        <Card header={"Teilnehmer"} headerBorder className={"mt-5"}></Card>
                    </>
                }
            />
        </>
    );
}
