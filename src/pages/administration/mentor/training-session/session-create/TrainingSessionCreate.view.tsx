import { Card } from "@/components/ui/Card/Card";
import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input/Input";
import { TbCalendarEvent, TbCalendarPlus, TbUser } from "react-icons/tb";
import dayjs from "dayjs";
import React, { FormEvent, useState } from "react";
import { Table } from "@/components/ui/Table/Table";
import { Separator } from "@/components/ui/Separator/Separator";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { UserModel } from "@/models/UserModel";
import TSCParticipantListTypes from "@/pages/administration/mentor/training-session/session-create/_types/TSCParticipantList.types";
import UserAdminService from "@/services/user/UserAdminService";
import ToastHelper from "@/utils/helper/ToastHelper";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { TrainingSessionCreateSkeleton } from "@/pages/administration/mentor/training-session/session-create/_skeletons/TrainingSessionCreate.skeleton";
import TrainingSessionAdminService from "@/services/training-session/TrainingSessionAdminService";
import { Select } from "@/components/ui/Select/Select";
import { MapArray } from "@/components/conditionals/MapArray";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import FormHelper from "@/utils/helper/FormHelper";
import useApi from "@/utils/hooks/useApi";
import { CourseModel } from "@/models/CourseModel";
import { TrainingTypeModel } from "@/models/TrainingTypeModel";
import { TrainingSessionModel } from "@/models/TrainingSessionModel";
import { Badge } from "@/components/ui/Badge/Badge";

/**
 * Creates a new training session based on a training request. It loads all initial data and allows the mentor to add more people at will
 * @constructor
 */
export function TrainingSessionCreateView() {
    const navigate = useNavigate();

    const { data: courses, loading: loadingCourses } = useApi<CourseModel[]>({
        url: "/administration/course/mentorable",
        method: "get",
    });

    const [submitting, setSubmitting] = useState<boolean>(false);

    const [courseUUID, setCourseUUID] = useState<string | undefined>(undefined);
    const [trainingTypeID, setTrainingTypeID] = useState<number | undefined>(undefined);
    const [participants, setParticipants] = useState<UserModel[]>([]);

    const [newParticipantID, setNewParticipantID] = useState<string>("");
    const [loadingUser, setLoadingUser] = useState<boolean>(false);

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
                setNewParticipantID("");
            })
            .catch(() => {
                ToastHelper.error(`Fehler beim laden des Benutzers ${newParticipantID}`);
            })
            .finally(() => setLoadingUser(false));
    }

    function createSession(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = FormHelper.getEntries(event?.target) as {
            date: string;
            course_uuid: string;
            training_type_id: number;
            training_station_id: string;
        };

        setSubmitting(true);
        TrainingSessionAdminService.createTrainingSession(participants, data.course_uuid, data.training_type_id, data.training_station_id, data.date)
            .then((session: TrainingSessionModel) => {
                ToastHelper.success("Session wurde erfolgreich erstellt");
                navigate(`/administration/training-request/planned/${session.uuid}`);
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Erstellen der Session");
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <>
            <PageHeader title={"Trainingssession Erstellen"} hideBackLink />

            <RenderIf
                truthValue={loadingCourses}
                elementTrue={<TrainingSessionCreateSkeleton />}
                elementFalse={
                    <>
                        <form onSubmit={createSession}>
                            <Card header={"Training"} headerBorder>
                                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5"}>
                                    <Select
                                        label={`Kurs Auswählen`}
                                        labelSmall
                                        name={"course_uuid"}
                                        defaultValue={"-1"}
                                        onChange={value => {
                                            if (value == "-1") {
                                                setCourseUUID(undefined);
                                                return;
                                            }
                                            setTrainingTypeID(undefined);
                                            setCourseUUID(value);
                                        }}>
                                        <option value={"-1"}>N/A</option>
                                        <MapArray
                                            data={courses ?? []}
                                            mapFunction={(course: CourseModel, index) => {
                                                return (
                                                    <option key={index} value={course.uuid}>
                                                        {course.name}
                                                    </option>
                                                );
                                            }}
                                        />
                                    </Select>

                                    <Select
                                        label={"Trainingstyp Auswählen"}
                                        labelSmall
                                        disabled={courses?.find(c => c.uuid == courseUUID)?.training_types?.length == 0 || courseUUID == null}
                                        name={"training_type_id"}
                                        defaultValue={"-1"}
                                        onChange={value => {
                                            if (value == "-1") {
                                                setTrainingTypeID(undefined);
                                                return;
                                            }
                                            setTrainingTypeID(Number(value));
                                        }}>
                                        <option value={"-1"}>N/A</option>
                                        <MapArray
                                            data={courses?.find(c => c.uuid == courseUUID)?.training_types ?? []}
                                            mapFunction={(trainingType: TrainingTypeModel, index) => {
                                                return (
                                                    <option key={index} value={trainingType.id}>
                                                        {trainingType.name}
                                                    </option>
                                                );
                                            }}
                                        />
                                    </Select>
                                </div>
                                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5"}>
                                    <Input
                                        label={"Datum (UTC)"}
                                        type={"datetime-local"}
                                        name={"date"}
                                        labelSmall
                                        preIcon={<TbCalendarEvent size={20} />}
                                        value={dayjs().utc().format("YYYY-MM-DD HH:mm")}
                                    />

                                    {/*
                                        Sorry to whoever has to maintain this :)
                                        Basically, what is going on here:
                                        1. We find the currently selected Course
                                        2. We find the currently selected Training type from this course
                                        3. We get the length of the training stations associated with this training type
                                    */}
                                    <Select
                                        label={"Trainingsstation Auswählen"}
                                        labelSmall
                                        disabled={
                                            courses?.find(c => c.uuid == courseUUID)?.training_types?.find(t => t.id == trainingTypeID)?.training_stations
                                                ?.length == 0 ||
                                            trainingTypeID == null ||
                                            courseUUID == null
                                        }
                                        name={"training_station_id"}
                                        defaultValue={"-1"}>
                                        <option value={"-1"}>N/A</option>
                                        <MapArray
                                            data={
                                                courses?.find(c => c.uuid == courseUUID)?.training_types?.find(t => t.id == trainingTypeID)
                                                    ?.training_stations ?? []
                                            }
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

                                <Button
                                    variant={"twoTone"}
                                    disabled={courseUUID == null || trainingTypeID == null}
                                    loading={submitting}
                                    color={COLOR_OPTS.PRIMARY}
                                    icon={<TbCalendarPlus size={20} />}
                                    type={"submit"}>
                                    Session Erstellen
                                </Button>
                            </Card>
                        </form>

                        <Card
                            header={"Teilnehmer"}
                            headerBorder
                            className={"mt-5"}
                            headerExtra={
                                participants.length == 0 ? <Badge color={COLOR_OPTS.DANGER}>Mindestens ein Teilnehmer erforderlich</Badge> : undefined
                            }>
                            <Input
                                onChange={e => setNewParticipantID(e.target.value)}
                                value={newParticipantID}
                                label={"Benutzer Hinzufügen"}
                                description={
                                    "Benutzer, die nicht in diesem Kurs eingeschrieben sind werden nicht berücksichtigt und der Session entsprechend nicht hinzugefügt."
                                }
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
