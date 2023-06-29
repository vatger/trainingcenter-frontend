import { Input } from "../../../../../../components/ui/Input/Input";
import { TbCirclePlus, TbTemplate, TbTrash } from "react-icons/all";
import { Button } from "../../../../../../components/ui/Button/Button";
import { SIZE_OPTS } from "../../../../../../assets/theme.config";
import { RenderIf } from "../../../../../../components/conditionals/RenderIf";
import { AddSkillTypeModalPartial } from "../../_modals/CSkillTemplate.modal";
import { CourseSkillTemplateModel } from "../../../../../../models/CourseModel";
import { useState } from "react";

export function CCSkillTemplatePartial() {
    const [skillTemplateModalOpen, setSkillTemplateModalOpen] = useState<boolean>(false);
    const [skillTemplate, setSkillTemplate] = useState<CourseSkillTemplateModel | undefined>(undefined);

    function handleSkillTemplateTypeChange(skillTemplate: CourseSkillTemplateModel) {
        setSkillTemplateModalOpen(false);
        setSkillTemplate(skillTemplate);
    }

    return (
        <>
            <Input
                readOnly
                labelSmall
                type={"text"}
                label={"Skillvorlage"}
                description={
                    "Jeder Benutzer des Kurses bekommt eine persönliche Skillvorlage die im Laufe der Ausbildung von Mentoren ausgefüllt und überprüft werden kann."
                }
                preIcon={<TbTemplate size={20} />}
                value={skillTemplate == null ? "N/A" : `${skillTemplate.name}`}
            />
            <input className={"hidden"} name={"skill_template_id"} value={skillTemplate?.id ?? 0} readOnly />

            <div className={"flex lg:flex-row flex-col"}>
                <Button
                    type={"button"}
                    onClick={() => setSkillTemplateModalOpen(true)}
                    icon={<TbCirclePlus size={20} />}
                    className={"mt-5 lg:mr-2"}
                    variant={"default"}
                    size={SIZE_OPTS.SM}>
                    Skillvorlage zuweisen
                </Button>
                <RenderIf
                    truthValue={skillTemplate != null}
                    elementTrue={
                        <Button
                            type={"button"}
                            onClick={() => setSkillTemplate(undefined)}
                            icon={<TbTrash size={20} />}
                            className={"mt-5"}
                            variant={"default"}
                            size={SIZE_OPTS.SM}>
                            Skillvorlage entfernen
                        </Button>
                    }
                />
            </div>

            <AddSkillTypeModalPartial onClose={() => setSkillTemplateModalOpen(true)} open={skillTemplateModalOpen} onSelect={handleSkillTemplateTypeChange} />
        </>
    );
}
