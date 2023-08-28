import { CourseModel, CourseSkillTemplateModel } from "../../../../../../models/CourseModel";
import { Input } from "../../../../../../components/ui/Input/Input";
import { TbActivity, TbCalendarEvent, TbCirclePlus, TbEdit, TbId, TbLock, TbTemplate, TbTrash } from "react-icons/all";
import moment from "moment/moment";
import { RenderIf } from "../../../../../../components/conditionals/RenderIf";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { Select } from "../../../../../../components/ui/Select/Select";
import { Separator } from "../../../../../../components/ui/Separator/Separator";
import React, { Dispatch, FormEvent, useEffect, useState } from "react";
import { CTrainingTypeModal } from "../../_modals/CTrainingType.modal";
import { TrainingTypeModel } from "../../../../../../models/TrainingTypeModel";
import { Button } from "../../../../../../components/ui/Button/Button";
import { CViewSettingsSkeleton } from "../../_skeletons/CViewSettings.skeleton";
import { TextArea } from "../../../../../../components/ui/Textarea/TextArea";
import { AddSkillTypeModalPartial } from "../../_modals/CSkillTemplate.modal";
import ToastHelper from "../../../../../../utils/helper/ToastHelper";
import FormHelper from "../../../../../../utils/helper/FormHelper";
import CourseAdministrationService from "../../../../../../services/course/CourseAdminService";

type CourseViewOverviewPartialProps = {
    courseData: CourseModel;
    setCourseData: Dispatch<CourseModel | undefined>;
    initialTraining?: CourseSkillTemplateModel;
};

export function CVSettingsSubpage(props: CourseViewOverviewPartialProps) {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [trainingTypeModalOpen, setTrainingTypeModalOpen] = useState<boolean>(false);
    const [skillTemplateModalOpen, setSkillTemplateModalOpen] = useState<boolean>(false);
    const [assignedTypes, setAssignedTypes] = useState<{ trainingType: TrainingTypeModel | undefined; skillTemplate: CourseSkillTemplateModel | undefined }>({
        trainingType: props.courseData!.training_type,
        skillTemplate: props.courseData!.skill_template,
    });

    function handleFormSubmission(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        let data = FormHelper.getEntries(e.target);
        data["course_uuid"] = props.courseData?.uuid;

        CourseAdministrationService.update(data)
            .then((res: CourseModel) => {
                if (props.courseData != null) props.setCourseData(res);
                ToastHelper.success("Kurs aktualisiert");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Aktualisieren des Kurses");
            })
            .finally(() => setIsSubmitting(false));
    }

    return (
        <>
            <div>
                <CTrainingTypeModal
                    onClose={() => {
                        setTrainingTypeModalOpen(false);
                    }}
                    open={trainingTypeModalOpen}
                    onSelect={(trainingType: TrainingTypeModel) => {
                        setAssignedTypes({ ...assignedTypes, trainingType: trainingType });
                        setTrainingTypeModalOpen(false);
                    }}
                />

                <AddSkillTypeModalPartial
                    onClose={() => {
                        setSkillTemplateModalOpen(false);
                    }}
                    open={skillTemplateModalOpen}
                    onSelect={(skillTemplate: CourseSkillTemplateModel) => {
                        setAssignedTypes({ ...assignedTypes, skillTemplate: skillTemplate });
                        setSkillTemplateModalOpen(false);
                    }}
                />

                <Input labelSmall label={"UUID"} preIcon={<TbId size={20} />} disabled value={props.courseData?.uuid} />
                <Input
                    labelSmall
                    disabled
                    label={"Zuletzt aktualisiert"}
                    className={"mt-5"}
                    preIcon={<TbCalendarEvent size={20} />}
                    value={props.courseData?.updatedAt == null ? "N/A" : moment(props.courseData?.updatedAt).format("DD.MM.YYYY HH:mm")}
                />

                <Separator />

                <form onSubmit={handleFormSubmission}>
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
                            value={props.courseData?.name}
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
                            value={props.courseData?.name_en}
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
                                value={props.courseData?.description}
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
                                value={props.courseData?.description_en}
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
                            defaultValue={props.courseData?.is_active ? 1 : 0}>
                            <option value={1}>Ja</option>
                            <option value={0}>Nein</option>
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
                            name={"self_enrol"}
                            preIcon={<TbLock size={20} />}
                            defaultValue={props.courseData?.self_enrollment_enabled ? 1 : 0}>
                            <option value={1}>Ja</option>
                            <option value={0}>Nein</option>
                        </Select>
                    </div>

                    <Separator />

                    <Input
                        readOnly
                        labelSmall
                        type={"text"}
                        required
                        label={"Initiales Training"}
                        description={"Dies ist das erste Training, welches jedem Mitglied des Kurses zugewiesen wird."}
                        preIcon={<TbTemplate size={20} />}
                        value={
                            assignedTypes.trainingType == null
                                ? "Keine Auswahl getroffen"
                                : `${assignedTypes.trainingType.name} (${assignedTypes.trainingType.type})`
                        }
                    />
                    <input className={"hidden"} name={"training_id"} value={assignedTypes.trainingType?.id ?? 0} readOnly />

                    <Button
                        type={"button"}
                        onClick={() => {
                            setTrainingTypeModalOpen(true);
                        }}
                        icon={<TbCirclePlus size={20} />}
                        className={"mt-5 w-full md:w-auto"}
                        variant={"default"}
                        size={SIZE_OPTS.SM}>
                        Trainingstypen zuweisen
                    </Button>

                    <Separator />

                    <Input
                        readOnly
                        labelSmall
                        type={"text"}
                        label={"Skillvorlage"}
                        description={
                            "Jeder Benutzer des Kurses bekommt eine persönliche Skillvorlage die im Laufe der Ausbildung von Mentoren ausgefüllt und überprüft werden kann."
                        }
                        preIcon={<TbTemplate size={20} />}
                        value={assignedTypes.skillTemplate == null ? "N/A" : `${assignedTypes.skillTemplate.name}`}
                    />
                    <input className={"hidden"} name={"skill_template_id"} value={assignedTypes.skillTemplate?.id ?? 0} readOnly />

                    <div className={"flex lg:flex-row flex-col"}>
                        <Button
                            type={"button"}
                            onClick={() => {
                                setSkillTemplateModalOpen(true);
                            }}
                            icon={<TbCirclePlus size={20} />}
                            className={"mt-5 lg:mr-2"}
                            variant={"default"}
                            size={SIZE_OPTS.SM}>
                            Skillvorlage zuweisen
                        </Button>
                        <RenderIf
                            truthValue={assignedTypes.skillTemplate != null}
                            elementTrue={
                                <Button
                                    type={"button"}
                                    onClick={() => setAssignedTypes({ ...assignedTypes, skillTemplate: undefined })}
                                    icon={<TbTrash size={20} />}
                                    className={"mt-5"}
                                    variant={"default"}
                                    size={SIZE_OPTS.SM}>
                                    Skillvorlage entfernen
                                </Button>
                            }
                        />
                    </div>

                    <Separator />

                    <Button type={"submit"} loading={isSubmitting} icon={<TbEdit size={20} />} variant={"twoTone"} color={COLOR_OPTS.PRIMARY}>
                        {isSubmitting ? <>Änderungen werden gespeichert</> : <>Änderungen Speichern</>}
                    </Button>
                </form>
            </div>
        </>
    );
}
