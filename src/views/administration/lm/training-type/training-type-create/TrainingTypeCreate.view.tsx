import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { AddLogTemplateModalPartial } from "../_partials/AddLogTemplateModal.partial";
import { TrainingLogTemplateModel } from "../../../../../models/TrainingLogTemplate.model";
import { Card } from "../../../../../components/ui/Card/Card";
import { Input } from "../../../../../components/ui/Input/Input";
import { TbBook2, TbCirclePlus, TbFilePlus, TbId, TbTemplate, TbTrash } from "react-icons/all";
import { Select } from "../../../../../components/ui/Select/Select";
import { Separator } from "../../../../../components/ui/Separator/Separator";
import { Button } from "../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../configs/theme/theme.config";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import { FormEvent, useRef, useState } from "react";
import FormHelper from "../../../../../utils/helper/FormHelper";
import ToastHelper from "../../../../../utils/helper/ToastHelper";
import TrainingTypeAdminService from "../../../../../services/training-type/TrainingType.admin.service";
import { useNavigate } from "react-router-dom";
import { TrainingTypeModel, TrainingTypes } from "../../../../../models/TrainingType.model";

export function TrainingTypeCreateView() {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [addTemplateModalOpen, setAddTemplateModalOpen] = useState<boolean>(false);
    const [assignedTypes, setAssignedTypes] = useState<{ logTemplate: TrainingLogTemplateModel | null }>({
        logTemplate: null,
    });
    const [selectedType, setSelectedType] = useState<TrainingTypes>("lesson");

    function handleLogTemplateChange(trainingLogTemplate: TrainingLogTemplateModel) {
        setAssignedTypes({ logTemplate: trainingLogTemplate });
        setAddTemplateModalOpen(false);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const data = FormHelper.getEntries(e.target);

        TrainingTypeAdminService.create(data)
            .then((res: TrainingTypeModel) => {
                navigate("/administration/training-type/" + res.id + "?r");
                ToastHelper.success("Trainingstyp erfolgreich erstellt");
            })
            .catch(() => {
                ToastHelper.error("Es ist ein Fehler beim Erstellen des Trainingtyps aufgetreten");
            })
            .finally(() => setIsSubmitting(false));
    }

    return (
        <>
            <PageHeader title={"Trainingstypen Erstellen"} hideBackLink />

            <AddLogTemplateModalPartial
                open={addTemplateModalOpen}
                onClose={() => setAddTemplateModalOpen(false)}
                onSelect={(trainingLogTemplate: TrainingLogTemplateModel) => handleLogTemplateChange(trainingLogTemplate)}
            />

            <Card>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className={"grid md:gap-5"}>
                        <Input
                            name={"name"}
                            type={"text"}
                            maxLength={70}
                            description={"Name des Trainingtyps"}
                            labelSmall
                            placeholder={"Frankfurt Tower Sim Session"}
                            label={"Name"}
                            regex={RegExp("^(?!\\s*$).+")}
                            regexMatchEmpty
                            regexCheckInitial
                            required
                            preIcon={<TbId size={20} />}
                        />
                    </div>

                    <div className={"grid md:gap-5"}>
                        <Select
                            description={
                                "Bestimmt den Typen des Trainings. Wähle bitte hier das korrekte aus der untenstehenden Liste, da dies Auswirkungen auf andere Elemente der Seite hat."
                            }
                            label={"Typ"}
                            className={"mt-5 flex flex-col"}
                            selectClassName={"mt-auto"}
                            labelSmall
                            required
                            defaultValue={"lesson"}
                            name={"type"}
                            onChange={s => {
                                setSelectedType(s as TrainingTypes);
                                if (s == "cpt") setAssignedTypes({ logTemplate: null });
                            }}
                            preIcon={<TbBook2 size={20} />}>
                            <option value={"lesson"}>Lesson</option>
                            <option value={"online"}>Online</option>
                            <option value={"sim"}>Sim Session</option>
                            <option value={"cpt"}>CPT</option>
                        </Select>
                    </div>

                    <Separator />

                    <Input
                        readOnly
                        labelSmall
                        type={"text"}
                        label={"Logvorlage"}
                        disabled={selectedType == "cpt"}
                        description={
                            "Bei jedem Training von diesem Typen werden die Mentoren dazu aufgefordert ein Log mit der unten stehenden Vorlage auszuwählen. " +
                            "Falls dieses Feld leer gelassen wird, bekommen die Mentoren ein einfaches Textfeld, welches ausgefüllt werden kann."
                        }
                        preIcon={<TbTemplate size={20} />}
                        value={assignedTypes.logTemplate == null ? "N/A" : `${assignedTypes.logTemplate.name}`}
                    />
                    <input className={"hidden"} name={"log_template_id"} value={assignedTypes.logTemplate?.id ?? -1} readOnly />

                    <div className={"flex lg:flex-row flex-col"}>
                        <Button
                            type={"button"}
                            onClick={() => setAddTemplateModalOpen(true)}
                            icon={<TbCirclePlus size={20} />}
                            className={"mt-5 lg:mr-2"}
                            variant={"default"}
                            disabled={selectedType == "cpt"}
                            size={SIZE_OPTS.SM}>
                            Logvorlage zuweisen
                        </Button>
                        <RenderIf
                            truthValue={assignedTypes.logTemplate != null && selectedType != "cpt"}
                            elementTrue={
                                <Button
                                    type={"button"}
                                    onClick={() => setAssignedTypes({ logTemplate: null })}
                                    icon={<TbTrash size={20} />}
                                    className={"mt-5"}
                                    variant={"default"}
                                    size={SIZE_OPTS.SM}>
                                    Logvorlage entfernen
                                </Button>
                            }
                        />
                    </div>

                    <Separator />

                    <Button type={"submit"} loading={isSubmitting} icon={<TbFilePlus size={20} />} variant={"twoTone"} color={COLOR_OPTS.PRIMARY}>
                        {isSubmitting ? <>Trainingtyp wird Erstellt</> : <>Trainingtypen Erstellen</>}
                    </Button>
                </form>
            </Card>
        </>
    );
}
