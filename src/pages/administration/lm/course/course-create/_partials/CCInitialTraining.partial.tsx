import { Input } from "../../../../../../components/ui/Input/Input";
import { TbCirclePlus, TbTemplate } from "react-icons/all";
import { Button } from "../../../../../../components/ui/Button/Button";
import { SIZE_OPTS } from "../../../../../../assets/theme.config";
import { CTrainingTypeModal } from "../../_modals/CTrainingType.modal";
import { TrainingTypeModel } from "../../../../../../models/TrainingTypeModel";
import { useState } from "react";

export function CCInitialTrainingPartial() {
    const [trainingTypeModalOpen, setTrainingTypeModalOpen] = useState<boolean>(false);
    const [trainingType, setTrainingType] = useState<TrainingTypeModel | undefined>(undefined);

    function handleTrainingTypeChange(tType: TrainingTypeModel) {
        setTrainingTypeModalOpen(false);
        setTrainingType(tType);
    }

    return (
        <>
            <Input
                readOnly
                labelSmall
                type={"text"}
                required
                label={"Initiales Training"}
                description={"Dies ist das erste Training, welches jedem Mitglied des Kurses zugewiesen wird."}
                inputError={trainingType == null}
                preIcon={<TbTemplate size={20} />}
                value={trainingType == null ? "Keine Auswahl getroffen" : `${trainingType.name} (${trainingType.type})`}
            />
            <input className={"hidden"} name={"training_id"} value={trainingType?.id ?? -1} readOnly />

            <Button
                type={"button"}
                onClick={() => setTrainingTypeModalOpen(true)}
                icon={<TbCirclePlus size={20} />}
                className={"mt-5 w-full md:w-auto"}
                variant={"default"}
                size={SIZE_OPTS.SM}>
                Trainingstypen zuweisen
            </Button>

            <CTrainingTypeModal onClose={() => setTrainingTypeModalOpen(false)} open={trainingTypeModalOpen} onSelect={handleTrainingTypeChange} />
        </>
    );
}
