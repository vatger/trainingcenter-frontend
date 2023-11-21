import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Card } from "@/components/ui/Card/Card";
import { Input } from "@/components/ui/Input/Input";
import { TbCalendarEvent, TbCalendarPlus, TbFilePlus, TbId } from "react-icons/tb";
import { Separator } from "@/components/ui/Separator/Separator";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS } from "@/assets/theme.config";
import { CommonConstants, CommonRegexp, Config } from "@/core/Config";
import useApi from "@/utils/hooks/useApi";
import { CourseModel } from "@/models/CourseModel";
import { Select } from "@/components/ui/Select/Select";
import { MapArray } from "@/components/conditionals/MapArray";
import React, { FormEvent, useState } from "react";
import dayjs from "dayjs";
import FormHelper from "@/utils/helper/FormHelper";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";
import { TrainingTypeModel } from "@/models/TrainingTypeModel";
import { TrainingStationModel } from "@/models/TrainingStationModel";

export function CPTCreateView() {
    const { data: courses, loading: loadingCourses } = useApi<CourseModel[]>({
        url: "/administration/course/mentorable",
        method: "get",
    });

    const [selectedCourseID, setSelectedCourseID] = useState<number | undefined>(undefined);
    const [selectedTrainingTypeID, setSelectedTrainingTypeID] = useState<number | undefined>(undefined);
    const [selectedTrainingStationID, setSelectedTrainingStationID] = useState<number | undefined>(undefined);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const trainingTypes = courses?.find(c => c.id == selectedCourseID)?.training_types?.filter(t => t.type == "cpt") ?? [];
    const trainingStations = trainingTypes?.find(t => t.id == selectedTrainingTypeID)?.training_stations ?? [];

    function createCPT(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);

        const data = FormHelper.getEntries(e.target);

        axiosInstance
            .post("/administration/cpt", data)
            .then(() => {
                ToastHelper.success("CPT erfolgreich geplant");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Erstellen des CPTs");
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    return (
        <>
            <PageHeader title={"CPT Erstellen"} hideBackLink />

            <Card header={"CPT Erstellen"} headerBorder>
                <form onSubmit={createCPT}>
                    <div className={"grid md:gap-5"}>
                        <Input
                            name={"trainee_id"}
                            type={"text"}
                            maxLength={CommonConstants.CID_MAX_LEN}
                            description={"CID des Trainees"}
                            labelSmall
                            placeholder={"1373921"}
                            label={"CID"}
                            regex={CommonRegexp.CID}
                            regexMatchEmpty
                            regexCheckInitial
                            required
                            preIcon={<TbId size={20} />}
                        />
                    </div>

                    <Input
                        label={"Datum (UTC)"}
                        type={"datetime-local"}
                        required
                        className={"mt-5"}
                        name={"date"}
                        labelSmall
                        preIcon={<TbCalendarEvent size={20} />}
                        value={dayjs.utc().format("YYYY-MM-DD HH:mm")}
                    />

                    <Select
                        name={"course_id"}
                        label={"Kurs"}
                        className={"mt-5"}
                        required
                        onChange={v => {
                            const val = Number(v);

                            if (!isNaN(Number(val)) && val !== -1) {
                                setSelectedCourseID(val);
                            }
                        }}
                        defaultValue={"-1"}>
                        <option value={"-1"} disabled>
                            Kurs Auswählen
                        </option>
                        <MapArray
                            data={courses ?? []}
                            mapFunction={(course: CourseModel, index) => {
                                return (
                                    <option key={course.uuid} value={course.id}>
                                        {course.name}
                                    </option>
                                );
                            }}
                        />
                    </Select>

                    <Select
                        name={"training_type_id"}
                        label={"Trainingstyp"}
                        required
                        className={"mt-5"}
                        disabled={selectedCourseID == null}
                        onChange={v => {
                            const val = Number(v);

                            if (!isNaN(Number(val)) && val !== -1) {
                                setSelectedTrainingTypeID(val);
                            }
                        }}
                        defaultValue={"-1"}>
                        <option value={"-1"} disabled>
                            Trainingstyp Auswählen
                        </option>
                        <MapArray
                            data={trainingTypes}
                            mapFunction={(trainingType: TrainingTypeModel, index) => {
                                return (
                                    <option key={trainingType.id} value={trainingType.id}>
                                        {trainingType.name}
                                    </option>
                                );
                            }}
                        />
                    </Select>

                    <Select
                        name={"training_station_id"}
                        label={"Trainingsstation"}
                        required
                        className={"mt-5"}
                        disabled={selectedCourseID == null || selectedTrainingTypeID == null}
                        onChange={v => {
                            const val = Number(v);

                            if (!isNaN(Number(val)) && val !== -1) {
                                setSelectedTrainingStationID(val);
                            }
                        }}
                        defaultValue={"-1"}>
                        <option value={"-1"} disabled>
                            Trainingsstation Auswählen
                        </option>
                        <MapArray
                            data={trainingStations}
                            mapFunction={(station: TrainingStationModel, index) => {
                                return (
                                    <option key={station.id} value={station.id}>
                                        {station.callsign} ({station.frequency.toFixed(3)})
                                    </option>
                                );
                            }}
                        />
                    </Select>

                    <Separator />

                    <Button
                        type={"submit"}
                        loading={submitting}
                        disabled={selectedCourseID == null || selectedTrainingTypeID == null || selectedTrainingStationID == null}
                        icon={<TbCalendarPlus size={20} />}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}>
                        CPT Planen
                    </Button>
                </form>
            </Card>
        </>
    );
}
