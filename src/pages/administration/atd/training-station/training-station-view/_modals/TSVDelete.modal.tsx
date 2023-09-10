import { Modal } from "@/components/ui/Modal/Modal";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS } from "@/assets/theme.config";
import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";

export function TSVDeleteModal({ show, onClose, trainingStation }: { show: boolean; onClose: () => any; trainingStation?: TrainingStationModel }) {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState<boolean>(false);

    function deleteTrainingStation() {
        if (trainingStation == null) {
            return;
        }

        setSubmitting(true);

        axiosInstance
            .delete(`/administration/training-station/${trainingStation.id}`)
            .then(() => {
                ToastHelper.success("Trainingsstation erfolgreich gelöscht");
                navigate("/administration/training-station");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Löschen der Trainingsstation");
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={"Trainingsstation Löschen"}
            footer={
                <div className={"flex justify-end"}>
                    <Button loading={submitting} icon={<TbTrash size={20} />} color={COLOR_OPTS.DANGER} variant={"twoTone"} onClick={deleteTrainingStation}>
                        Löschen
                    </Button>
                </div>
            }>
            <p>
                Bist du sicher, dass du die Station <strong>{trainingStation?.callsign.toUpperCase()}</strong> löschen möchtest? Dies könnte negative
                Auswirkungen auf Trainingstypen geben, welche diese Station verwenden. Als alternative steht das Deaktivieren der Station zur verfügung.
            </p>
        </Modal>
    );
}
