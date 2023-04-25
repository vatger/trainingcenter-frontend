import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import { Card } from "../../../../../components/ui/Card/Card";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "../../../../../components/ui/Input/Input";
import { TbEdit, TbEye, TbEyeCheck, TbFilePlus, TbId } from "react-icons/all";
import { Separator } from "../../../../../components/ui/Separator/Separator";
import { Button } from "../../../../../components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "../../../../../configs/theme/theme.config";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import { LogTemplateElement } from "./_types/LogTemplateElement.types";
import { MapArray } from "../../../../../components/conditionals/MapArray";
import { LogTemplateElementPartial } from "./_partials/LogTemplateElement.partial";
import { LogTemplateElementPreviewPartial } from "./_partials/LogTemplateElementPreview.partial";
import { AddLogTemplateElementModal } from "./_partials/AddLogTemplateElementModal";
import FormHelper from "../../../../../utils/helper/FormHelper";
import TrainingLogTemplateAdminService from "../../../../../services/log-template/TrainingLogTemplate.admin.service";
import { useNavigate } from "react-router-dom";
import { TrainingLogTemplateModel } from "../../../../../models/TrainingLogTemplate.model";
import ToastHelper from "../../../../../utils/helper/ToastHelper";

export function LogTemplateCreateView() {
    const navigate = useNavigate();
    const [content, setContent] = useState<LogTemplateElement[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [showingPreview, setShowingPreview] = useState<boolean>(false);

    const [addElementModalOpen, setAddElementModalOpen] = useState<boolean>(false);

    function createTemplate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        let data = FormHelper.getEntries(e.target);
        data["content"] = content;

        TrainingLogTemplateAdminService.create(data)
            .then((res: TrainingLogTemplateModel) => {
                navigate("/administration/log-template/" + res.id);
                ToastHelper.success("Logvorlage erfolgreich erstellt");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Erstellen der Logvorlage");
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <>
            <PageHeader title={"Logvorlage Erstellen"} hideBackLink />

            <Card header={"Eigenschaften"} headerBorder>
                <form onSubmit={createTemplate}>
                    <Input
                        name={"name"}
                        type={"text"}
                        maxLength={70}
                        description={"Name der Logvorlage"}
                        labelSmall
                        placeholder={"Frankfurt Tower Sim Vorlage"}
                        label={"Name"}
                        required
                        regex={RegExp("^(?!\\s*$).+")}
                        regexMatchEmpty
                        regexCheckInitial
                        preIcon={<TbId size={20} />}
                    />

                    <Separator />

                    <Button
                        loading={submitting}
                        disabled={content.length == 0}
                        type={"submit"}
                        icon={<TbFilePlus size={20} />}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}>
                        Logvorlage Erstellen
                    </Button>
                </form>
            </Card>

            <Card className={"mt-5"} header={"Inhalt der Logvorlage"} headerBorder>
                <RenderIf
                    truthValue={content.length == 0}
                    elementTrue={<>Kein Inhalt vorhanden</>}
                    elementFalse={
                        <MapArray
                            data={content}
                            mapFunction={(value: LogTemplateElement, index) => {
                                return (
                                    <RenderIf
                                        key={index}
                                        truthValue={showingPreview}
                                        elementTrue={<LogTemplateElementPreviewPartial element={value} index={index} key={index} />}
                                        elementFalse={
                                            <LogTemplateElementPartial
                                                element={value}
                                                content={content}
                                                setContent={setContent}
                                                index={index}
                                                length={content.length}
                                                key={index}
                                            />
                                        }
                                    />
                                );
                            }}
                        />
                    }
                />

                <Separator />

                <div className={"flex flex-col lg:flex-row"}>
                    <Button
                        onClick={() => setAddElementModalOpen(true)}
                        type={"button"}
                        icon={<TbFilePlus size={20} />}
                        size={SIZE_OPTS.SM}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}>
                        Element hinzufügen
                    </Button>

                    <Button
                        type={"button"}
                        disabled={content.length == 0}
                        onClick={() => setShowingPreview(!showingPreview)}
                        className={"mt-4 lg:mt-0 lg:ml-4"}
                        icon={showingPreview ? <TbEdit size={20} /> : <TbEyeCheck size={20} />}
                        size={SIZE_OPTS.SM}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}>
                        {showingPreview ? "Bearbeitungsmodus anzeigen" : "Vorschau anzeigen"}
                    </Button>
                </div>
            </Card>

            <AddLogTemplateElementModal
                show={addElementModalOpen}
                onClose={() => setAddElementModalOpen(false)}
                logTemplateElements={content}
                setLogTemplateElements={setContent}
            />
        </>
    );
}
