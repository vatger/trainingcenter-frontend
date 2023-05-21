import { Input } from "../../../../../../components/ui/Input/Input";
import { TbBook2, TbCirclePlus, TbEdit, TbId, TbTemplate, TbTrash } from "react-icons/all";
import { Select } from "../../../../../../components/ui/Select/Select";
import { Separator } from "../../../../../../components/ui/Separator/Separator";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../../assets/theme.config";
import { RenderIf } from "../../../../../../components/conditionals/RenderIf";
import React, { Dispatch, FormEvent, useEffect, useState } from "react";
import { TrainingTypeModel, TrainingTypes } from "../../../../../../models/TrainingTypeModel";
import { AddLogTemplateModalPartial } from "../../_partials/AddLogTemplateModal.partial";
import { TrainingLogTemplateModel } from "../../../../../../models/TrainingLogTemplateModel";
import FormHelper from "../../../../../../utils/helper/FormHelper";
import TrainingTypeAdminService from "../../../../../../services/training-type/TrainingTypeAdminService";
import ToastHelper from "../../../../../../utils/helper/ToastHelper";

type TrainingTypeViewSettingsSubpageProps = {
    loading: boolean;
    trainingType?: TrainingTypeModel;
    setTrainingType: Dispatch<TrainingTypeModel>;
};

export function TrainingTypeViewSettingsSubpage(props: TrainingTypeViewSettingsSubpageProps) {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [addTemplateModalOpen, setAddTemplateModalOpen] = useState<boolean>(false);
    const [assignedTypes, setAssignedTypes] = useState<{ logTemplate: TrainingLogTemplateModel | null }>({
        logTemplate: null,
    });
    const [selectedType, setSelectedType] = useState<TrainingTypes>(props.trainingType?.type ?? "lesson");

    useEffect(() => {
        if (props.trainingType != null && props.trainingType.log_template != null) {
            setSelectedType(props.trainingType.type);
            setAssignedTypes({ logTemplate: props.trainingType.log_template });
        }
    }, [props.trainingType]);

    function handleLogTemplateChange(trainingLogTemplate: TrainingLogTemplateModel) {
        setAssignedTypes({ logTemplate: trainingLogTemplate });
        setAddTemplateModalOpen(false);
    }

    function handleUpdate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const data = FormHelper.getEntries(e.target);
        TrainingTypeAdminService.update(props.trainingType?.id ?? -1, data)
            .then((res: TrainingTypeModel) => {
                props.setTrainingType(res);
                ToastHelper.success("Trainingstyp erfolgreich aktualisiert");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim aktualisieren des Trainingstyps");
            })
            .finally(() => setIsSubmitting(false));
    }

    return (
        <>
            <AddLogTemplateModalPartial
                open={addTemplateModalOpen}
                onClose={() => setAddTemplateModalOpen(false)}
                onSelect={(trainingLogTemplate: TrainingLogTemplateModel) => handleLogTemplateChange(trainingLogTemplate)}
            />

            <form onSubmit={e => handleUpdate(e)}>
                <div className={"grid md:gap-5"}>
                    <Input
                        name={"name"}
                        type={"text"}
                        maxLength={70}
                        description={"Name des Trainingtyps"}
                        labelSmall
                        value={props.trainingType?.name}
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
                        defaultValue={props.trainingType?.type ?? "lesson"}
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

                <Button type={"submit"} loading={isSubmitting} icon={<TbEdit size={20} />} variant={"twoTone"} color={COLOR_OPTS.PRIMARY}>
                    {isSubmitting ? <>Änderungen werden gespeichert</> : <>Änderungen Speichern</>}
                </Button>
            </form>
        </>
    );
}
