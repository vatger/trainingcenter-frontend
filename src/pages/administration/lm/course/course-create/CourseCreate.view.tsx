import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { TrainingTypeModel } from "../../../../../models/TrainingTypeModel";
import { CourseModel, CourseSkillTemplateModel } from "../../../../../models/CourseModel";
import { FormEvent, useRef, useState } from "react";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import { COLOR_OPTS, SIZE_OPTS, TYPE_OPTS } from "../../../../../assets/theme.config";
import { generateUUID } from "../../../../../utils/helper/UUIDHelper";
import CourseAdministrationService from "../../../../../services/course/CourseAdminService";
import { Separator } from "../../../../../components/ui/Separator/Separator";
import { Input } from "../../../../../components/ui/Input/Input";
import { TbActivity, TbCirclePlus, TbFilePlus, TbId, TbLock, TbTemplate, TbTrash } from "react-icons/all";
import { Select } from "../../../../../components/ui/Select/Select";
import { Button } from "../../../../../components/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { CourseViewSettingsSkeleton } from "../_skeletons/CourseViewSettings.skeleton";
import UserService from "../../../../../services/user/UserService";
import { MentorGroupModel } from "../../../../../models/MentorGroupModel";
import { MapArray } from "../../../../../components/conditionals/MapArray";
import { TextArea } from "../../../../../components/ui/Textarea/TextArea";
import { Card } from "../../../../../components/ui/Card/Card";
import FormHelper from "../../../../../utils/helper/FormHelper";
import ToastHelper from "../../../../../utils/helper/ToastHelper";
import { NetworkError } from "../../../../../components/errors/NetworkError";
import { Alert } from "../../../../../components/ui/Alert/Alert";
import { AddTrainingTypeModalPartial } from "../_partials/AddTrainingTypeModal.partial";
import { AddSkillTypeModalPartial } from "../_partials/AddSkillTemplateModal.partial";

export function CourseCreateView() {
    const uuid = useRef<string>(generateUUID());
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [modalStates, setModalStates] = useState<{ trainingTypeModalOpen: boolean; skillTemplateModalOpen: boolean }>({
        trainingTypeModalOpen: false,
        skillTemplateModalOpen: false,
    });
    const [assignedTypes, setAssignedTypes] = useState<{ trainingType: TrainingTypeModel | null; skillTemplate: CourseSkillTemplateModel | null }>({
        trainingType: null,
        skillTemplate: null,
    });

    const { mentorGroups, loading, loadingError } = UserService.getCourseManagerMentorGroups();

    function handleFormSubmission(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const data = FormHelper.getEntries(e.target);

        CourseAdministrationService.create(data)
            .then((res: CourseModel) => {
                navigate(`/administration/course/${res.uuid}`);
                ToastHelper.success(`Kurs "${res.name}" erfolgreich erstellt`);
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Erstellen des Kurses");
            })
            .finally(() => setIsSubmitting(false));
    }

    function handleTrainingTypeChange(tType: TrainingTypeModel) {
        setModalStates({ ...modalStates, trainingTypeModalOpen: false });
        setAssignedTypes({ ...assignedTypes, trainingType: tType });
    }

    function handleSkillTemplateTypeChange(skillTemplate: CourseSkillTemplateModel) {
        setModalStates({ ...modalStates, skillTemplateModalOpen: false });
        setAssignedTypes({ ...assignedTypes, skillTemplate: skillTemplate });
    }

    return (
        <>
            <PageHeader title={"Kurs Erstellen"} hideBackLink />

            <RenderIf
                truthValue={loading}
                elementTrue={<CourseViewSettingsSkeleton />}
                elementFalse={
                    <RenderIf
                        truthValue={loadingError != null}
                        elementTrue={<NetworkError error={loadingError?.error} closeable={false} />}
                        elementFalse={
                            <RenderIf
                                truthValue={mentorGroups.length == 0}
                                elementTrue={
                                    <Alert className={"mb-4"} type={TYPE_OPTS.DANGER} showIcon rounded>
                                        Du hast in keiner Mentorengruppe die Rechte Kurse zu verwalten oder anzulegen.
                                    </Alert>
                                }
                                elementFalse={
                                    <Card>
                                        <AddTrainingTypeModalPartial
                                            onClose={() => setModalStates({ ...modalStates, trainingTypeModalOpen: false })}
                                            open={modalStates.trainingTypeModalOpen}
                                            onSelect={tType => {
                                                handleTrainingTypeChange(tType);
                                            }}
                                        />

                                        <AddSkillTypeModalPartial
                                            onClose={() => setModalStates({ ...modalStates, skillTemplateModalOpen: false })}
                                            open={modalStates.skillTemplateModalOpen}
                                            onSelect={skillTemplate => {
                                                handleSkillTemplateTypeChange(skillTemplate);
                                            }}
                                        />

                                        <form onSubmit={e => handleFormSubmission(e)}>
                                            <Input labelSmall label={"UUID"} preIcon={<TbId size={20} />} disabled value={uuid.current} />
                                            <Input className={"hidden"} name={"course_uuid"} value={uuid.current} />

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
                                                    regexCheckInitial
                                                    preIcon={<TbId size={20} />}
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
                                                    regexCheckInitial
                                                    preIcon={<TbId size={20} />}
                                                />
                                            </div>

                                            <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-5"}>
                                                <div className={"mt-5"}>
                                                    <TextArea
                                                        label={"Beschreibung"}
                                                        description={"Beschreibung des Kurses"}
                                                        placeholder={"Die Frankfurt Tower Einweisung ist für alle Lotsen..."}
                                                        required
                                                        regex={RegExp("^(?!\\s*$).+")}
                                                        regexMatchEmpty
                                                        regexCheckInitial
                                                        labelSmall
                                                        name={"description_de"}
                                                    />
                                                </div>
                                                <div className={"mt-5"}>
                                                    <TextArea
                                                        label={"Beschreibung (EN)"}
                                                        description={"Beschreibung des Kurses auf Englisch"}
                                                        placeholder={"The Frankfurt Tower Endorsement is meant for all controllers..."}
                                                        required
                                                        regex={RegExp("^(?!\\s*$).+")}
                                                        regexMatchEmpty
                                                        regexCheckInitial
                                                        labelSmall
                                                        name={"description_en"}
                                                    />
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
                                                    preIcon={<TbActivity size={20} />}>
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
                                                    preIcon={<TbLock size={20} />}>
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
                                                inputError={assignedTypes.trainingType == null}
                                                preIcon={<TbTemplate size={20} />}
                                                value={
                                                    assignedTypes.trainingType == null
                                                        ? "Keine Auswahl getroffen"
                                                        : `${assignedTypes.trainingType.name} (${assignedTypes.trainingType.type})`
                                                }
                                            />
                                            <input className={"hidden"} name={"training_id"} value={assignedTypes.trainingType?.id ?? -1} readOnly />

                                            <Button
                                                type={"button"}
                                                onClick={() => setModalStates({ ...modalStates, trainingTypeModalOpen: true })}
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
                                                    onClick={() => setModalStates({ ...modalStates, skillTemplateModalOpen: true })}
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
                                                            onClick={() => setAssignedTypes({ ...assignedTypes, skillTemplate: null })}
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

                                            <Select
                                                description={
                                                    "Jeder Kurs muss einer Mentorengruppe zugewiesen werden. Die Administratoren dieser Mentorgruppe sind in der Lage den Kurs zu bearbeiten, oder neue in diese Gruppe hinzuzufügen. " +
                                                    "Falls mehrere Mentorengruppen sich diesen Kurs teilen, wähle zunächst eine Mentorgruppe aus, die diesen Kurs mentorieren soll und füge anschließend in der Kursübersicht die weiteren " +
                                                    "Mentorengruppen hinzu."
                                                }
                                                label={"Mentorgruppe"}
                                                className={"mt-5 flex flex-col"}
                                                labelSmall
                                                disabled={mentorGroups.length == 0}
                                                required
                                                name={"mentor_group_id"}
                                                preIcon={<TbActivity size={20} />}>
                                                <RenderIf
                                                    truthValue={mentorGroups.length == 0}
                                                    elementTrue={<option value={-1}>Du darfst in keiner Mentorgruppe Kurse verwalten.</option>}
                                                    elementFalse={
                                                        <MapArray
                                                            data={mentorGroups}
                                                            mapFunction={(value: MentorGroupModel, index) => {
                                                                return (
                                                                    <option key={index} value={value.id}>
                                                                        {value.name}
                                                                    </option>
                                                                );
                                                            }}
                                                        />
                                                    }
                                                />
                                            </Select>

                                            <Separator />

                                            <Button
                                                type={"submit"}
                                                disabled={mentorGroups.length == 0}
                                                loading={isSubmitting}
                                                icon={<TbFilePlus size={20} />}
                                                variant={"twoTone"}
                                                color={COLOR_OPTS.PRIMARY}>
                                                {isSubmitting ? <>Kurs wird Erstellt</> : <>Kurs Erstellen</>}
                                            </Button>
                                        </form>
                                    </Card>
                                }
                            />
                        }
                    />
                }
            />
        </>
    );
}
