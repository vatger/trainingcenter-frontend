import { Modal } from "@/components/ui/Modal/Modal";
import { TrainingLogTemplateModel } from "@/models/TrainingLogTemplateModel";
import { Button } from "@/components/ui/Button/Button";
import { TbTrash } from "react-icons/tb";
import { COLOR_OPTS } from "@/assets/theme.config";
import React, { useState } from "react";
import TrainingLogTemplateAdminService from "@/services/log-template/TrainingLogTemplateAdminService";
import { NavigateFunction } from "react-router-dom";
import ToastHelper from "@/utils/helper/ToastHelper";

export function LTVDeleteModal({
    show,
    logTemplate,
    onClose,
    navigate,
}: {
    show: boolean;
    logTemplate?: TrainingLogTemplateModel;
    onClose: () => any;
    navigate: NavigateFunction;
}) {
    const [deleting, setDeleting] = useState<boolean>(false);

    function deleteLogTemplae() {
        if (logTemplate == null) {
            return;
        }

        setDeleting(true);

        TrainingLogTemplateAdminService.destroy(logTemplate.id)
            .then(() => {
                ToastHelper.success("Logvorlage erfolgreich gelöscht");
                navigate("/administration/log-template/view");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Löschen der Logvorlage");
            })
            .finally(() => setDeleting(false));
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={"Logvorlage Löschen"}
            footer={
                <div className={"flex justify-end mt-5"}>
                    <Button icon={<TbTrash size={20} />} loading={deleting} variant={"twoTone"} onClick={() => deleteLogTemplae()} color={COLOR_OPTS.DANGER}>
                        Abmelden
                    </Button>
                </div>
            }>
            <p>
                Bist du sicher, dass du die Logvorlage <strong>"{logTemplate?.name}"</strong> löschen möchtest? Diese Aktion kann nicht rückgängig gemacht
                werden und beeinflusst evtl. Trainingstypen, bei denen diese Logvorlage hinterlegt worden ist.
            </p>
        </Modal>
    );
}
