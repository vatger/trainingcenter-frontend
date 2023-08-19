import {Modal} from "@/components/ui/Modal/Modal";
import {TrainingSessionModel} from "@/models/TrainingSessionModel";
import dayjs from "dayjs";
import {Config} from "@/core/Config";
import {Input} from "@/components/ui/Input/Input";
import {Button} from "@/components/ui/Button/Button";
import {COLOR_OPTS} from "@/assets/theme.config";
import {TbTrash} from "react-icons/all";
import {Separator} from "@/components/ui/Separator/Separator";
import {useState} from "react";
import TrainingSessionAdminService from "@/services/training-session/TrainingSessionAdminService";
import ToastHelper from "@/utils/helper/ToastHelper";

export function MTLDeleteSessionModal({show, onClose, onSubmit, selectedTrainingSession}: {show: boolean, onClose: () => any, onSubmit: (training: TrainingSessionModel) => any, selectedTrainingSession?: TrainingSessionModel}) {
    const [submitting, setSubmitting] = useState<boolean>(false);

    function deleteSession() {
        if (selectedTrainingSession == null) {
            return;
        }

        setSubmitting(true);
        TrainingSessionAdminService.deleteTrainingSession(selectedTrainingSession.id)
            .then(() => {
                onSubmit(selectedTrainingSession);
                onClose();
                ToastHelper.success("Session erfolgreich gelöscht");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Löschen der Session");
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <Modal
            show={show}
            title={"Training Löschen"}
            onClose={onClose}
            footer={
                <span className={"flex justify-end"}>
                    <Button loading={submitting} onClick={deleteSession} icon={<TbTrash size={20}/>} color={COLOR_OPTS.DANGER} variant={"twoTone"}>
                        Löschen
                    </Button>
                </span>
            }
        >
            <Input label={"Kurs"} labelSmall disabled readOnly value={selectedTrainingSession?.course?.name}/>
            <Input className={"mt-3"} label={"Trainingstyp"} labelSmall disabled readOnly value={selectedTrainingSession?.training_type?.name}/>
            <Input className={"mt-3"} label={"Datum (UTC)"} labelSmall disabled readOnly value={dayjs.utc(selectedTrainingSession?.date).format(Config.DATETIME_FORMAT)}/>

            <p className={"mt-5"}>
                Bist du sicher, dass du das Training löschen möchtest?
                Diese Aktion ist unwiderruflich und hat zur Folge, dass die zum Training angemeldeten Mitglieder erneut auf
                der Warteliste platziert werden.
            </p>

            <Separator/>
        </Modal>
    )
}