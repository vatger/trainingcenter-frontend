import { CourseModel, CourseSkillTemplateModel } from "@/models/CourseModel";
import { Input } from "@/components/ui/Input/Input";
import { TbActivity, TbCalendarEvent, TbCirclePlus, TbEdit, TbId, TbLock, TbTemplate, TbTrash } from "react-icons/tb";
import moment from "moment/moment";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { Select } from "@/components/ui/Select/Select";
import { Separator } from "@/components/ui/Separator/Separator";
import React, { Dispatch, FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { TextArea } from "@/components/ui/Textarea/TextArea";
import ToastHelper from "../../../../../../utils/helper/ToastHelper";
import FormHelper from "../../../../../../utils/helper/FormHelper";
import CourseAdministrationService from "../../../../../../services/course/CourseAdminService";
import useApi from "@/utils/hooks/useApi";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { TrainingTypeModel } from "@/models/TrainingTypeModel";
import { MapArray } from "@/components/conditionals/MapArray";
import StringHelper from "@/utils/helper/StringHelper";
import { CVSettingsSkeleton } from "@/pages/administration/lm/course/course-view/_skeletons/CVSettings.skeleton";

export function CVSettingsSubpage({ courseUUID }: { courseUUID: string | undefined }) {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const {
        data: course,
        setData: setCourse,
        loading: loadingCourse,
    } = useApi<CourseModel>({
        url: `/administration/course/${courseUUID}`,
        method: "get",
    });

    const { data: trainingTypes, loading: loadingTrainingTypes } = useApi<TrainingTypeModel[]>({
        url: "/administration/training-type",
        method: "get",
    });

    const { data: skillTemplates, loading: loadingSkillTemplates } = useApi<CourseSkillTemplateModel[]>({
        url: "/administration/skill-template",
        method: "get",
    });

    function handleFormSubmission(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        let data = FormHelper.getEntries(e.target);
        data["active"] = data["active"] == "1";
        data["self_enrol_enabled"] = data["self_enrol_enabled"] == "1";

        CourseAdministrationService.update(data)
            .then(() => {
                if (course != null) {
                    setCourse({ ...course, updatedAt: new Date() });
                }
                ToastHelper.success("Kurs aktualisiert");
            })
            .catch(() => {
                if (course != null) {
                    setCourse({ ...course, updatedAt: new Date() });
                }
                ToastHelper.error("Fehler beim Aktualisieren des Kurses");
            })
            .finally(() => setIsSubmitting(false));
    }

    return (
        <>
            <RenderIf
                truthValue={loadingCourse || loadingTrainingTypes}
                elementTrue={<CVSettingsSkeleton />}
                elementFalse={
                    <div>
                        <form onSubmit={handleFormSubmission}>
                            <Input labelSmall name={"course_uuid"} label={"UUID"} preIcon={<TbId size={20} />} readOnly value={course?.uuid} />
                            <Input
                                labelSmall
                                disabled
                                label={"Zuletzt aktualisiert (UTC)"}
                                className={"mt-5"}
                                preIcon={<TbCalendarEvent size={20} />}
                                value={course?.updatedAt == null ? "N/A" : dayjs.utc(course?.updatedAt).format(Config.DATETIME_FORMAT)}
                            />

                            <Separator />

                            <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-5"}>
                                <Input
                                    name={"name_de"}
                                    type={"text"}
                                    maxLength={70}
                                    description={"Name des Kurses"}
                                    labelSmall
                                    placeholder={"Frankfurt Tower Einweisung"}
                                    label={"Name"}
                                    required
                                    regex={RegExp("^(?!\\s*$).+")}
                                    regexMatchEmpty
                                    preIcon={<TbId size={20} />}
                                    value={course?.name}
                                />
                                <Input
                                    name={"name_en"}
                                    type={"text"}
                                    maxLength={70}
                                    className={"mt-5 md:mt-0"}
                                    description={"Name des Kurses in Englisch"}
                                    labelSmall
                                    placeholder={"Frankfurt Tower Endorsement"}
                                    label={"Name (EN)"}
                                    required
                                    regex={RegExp("^(?!\\s*$).+")}
                                    regexMatchEmpty
                                    preIcon={<TbId size={20} />}
                                    value={course?.name_en}
                                />
                            </div>

                            <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-5"}>
                                <div className={"mt-5"}>
                                    <TextArea
                                        label={"Beschreibung"}
                                        description={"Beschreibung des Kurses"}
                                        required
                                        labelSmall
                                        regex={RegExp("^(?!\\s*$).+")}
                                        regexMatchEmpty
                                        value={course?.description}
                                        name={"description_de"}></TextArea>
                                </div>

                                <div className={"mt-5"}>
                                    <TextArea
                                        label={"Beschreibung (EN)"}
                                        description={"Beschreibung des Kurses auf Englisch"}
                                        placeholder={"The Frankfurt Tower Endorsement is meant for all controllers..."}
                                        required
                                        labelSmall
                                        regex={RegExp("^(?!\\s*$).+")}
                                        regexMatchEmpty
                                        value={course?.description_en}
                                        name={"description_en"}></TextArea>
                                </div>
                            </div>

                            <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-5"}>
                                <Select
                                    description={
                                        "Wenn der Kurs aktiv ist, wird dieser in der Kurssuche angezeigt. Mentoren sind nur im aktiven Zustand in der Lage Mitglieder in Kursen hinzuzufügen - sofern dies nicht durch die Selbsteinschreibung geregelt ist."
                                    }
                                    label={"Kurs Aktiv"}
                                    className={"mt-5 flex flex-col"}
                                    labelSmall
                                    required
                                    name={"active"}
                                    preIcon={<TbActivity size={20} />}
                                    defaultValue={course?.is_active ? 1 : 0}>
                                    <option value={"1"}>Ja</option>
                                    <option value={"0"}>Nein</option>
                                </Select>

                                <Select
                                    description={
                                        "Wenn die Selbsteinschreibung aktiviert ist, können sich Mitglieder selber in diesen Kurs einschreiben. Falls nicht, geschieht dies über Mentoren oder das ATD."
                                    }
                                    label={"Selbsteinschreibung Aktiv"}
                                    className={"mt-5 flex flex-col"}
                                    selectClassName={"mt-auto"}
                                    labelSmall
                                    required
                                    name={"self_enrol_enabled"}
                                    preIcon={<TbLock size={20} />}
                                    defaultValue={course?.self_enrollment_enabled ? 1 : 0}>
                                    <option value={"1"}>Ja</option>
                                    <option value={"0"}>Nein</option>
                                </Select>
                            </div>

                            <Separator />

                            <Select
                                label={"Initiales Training"}
                                labelSmall
                                name={"training_type_id"}
                                description={"Dies ist das erste Training, welches jedem Mitglied des Kurses zugewiesen wird."}
                                required
                                preIcon={<TbTemplate size={20} />}
                                defaultValue={course?.initial_training_type.toString()}>
                                <MapArray
                                    data={trainingTypes ?? []}
                                    mapFunction={(trainingType: TrainingTypeModel, index: number) => {
                                        return (
                                            <option key={index} value={trainingType.id.toString()}>
                                                {trainingType.name} ({StringHelper.capitalize(trainingType.type)})
                                            </option>
                                        );
                                    }}
                                />
                            </Select>

                            <Select
                                label={"Skillvorlage"}
                                labelSmall
                                className={"mt-5"}
                                name={"skill_template_id"}
                                description={
                                    "Jeder Benutzer des Kurses bekommt eine persönliche Skillvorlage die im Laufe der Ausbildung von Mentoren ausgefüllt und überprüft werden kann."
                                }
                                required
                                preIcon={<TbTemplate size={20} />}
                                defaultValue={course?.skill_template_id?.toString() ?? "NaN"}>
                                <option key={"NaN"}>Keine Skillvorlage</option>
                                <MapArray
                                    data={skillTemplates ?? []}
                                    mapFunction={(skillTemplate: CourseSkillTemplateModel, index: number) => {
                                        return (
                                            <option key={index} value={skillTemplate.id.toString()}>
                                                {skillTemplate.name}
                                            </option>
                                        );
                                    }}
                                />
                            </Select>

                            <Separator />

                            <Button type={"submit"} loading={isSubmitting} icon={<TbEdit size={20} />} variant={"twoTone"} color={COLOR_OPTS.PRIMARY}>
                                {isSubmitting ? <>Änderungen werden gespeichert</> : <>Änderungen Speichern</>}
                            </Button>
                        </form>
                    </div>
                }
            />
        </>
    );
}
