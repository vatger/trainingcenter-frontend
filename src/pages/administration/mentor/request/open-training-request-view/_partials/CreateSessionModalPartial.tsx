import { Modal } from "../../../../../../components/ui/Modal/Modal";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../../assets/theme.config";
import { TrainingRequestModel } from "../../../../../../models/TrainingRequestModel";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import UserTrainingService from "../../../../../../services/user/UserTrainingService";
import ToastHelper from "../../../../../../utils/helper/ToastHelper";
import { TbCalendarPlus, TbTrash } from "react-icons/all";
import TrainingRequestAdminService from "../../../../../../services/training-request/TrainingRequestAdminService";
import { Input } from "../../../../../../components/ui/Input/Input";
import dayjs from "dayjs";
import { Separator } from "../../../../../../components/ui/Separator/Separator";
import { RenderIf } from "../../../../../../components/conditionals/RenderIf";
import { TextArea } from "../../../../../../components/ui/Textarea/TextArea";
import FormHelper from "../../../../../../utils/helper/FormHelper";
import TrainingSessionAdminService from "../../../../../../services/training-session/TrainingSessionAdminService";
import { TrainingSessionModel } from "../../../../../../models/TrainingSessionModel";

/**
 * Confirms and deletes a training of a specific user.
 * This modal is only executed by mentors (and above).
 * @constructor
 */
export function CreateSessionModalPartial(props: { open: boolean; onClose: () => any; trainingRequest?: TrainingRequestModel; onCreate: () => any }) {
    const [submitting, setSubmitting] = useState<boolean>(false);

    function createSession(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);

        const data = FormHelper.getEntries(e.target) as { date: string };

        TrainingSessionAdminService.createTrainingSession(props.trainingRequest?.user_id, props.trainingRequest?.uuid, data.date)
            .then((session: TrainingSessionModel) => {
                console.log(session);
            })
            .finally(() => {
                setSubmitting(false);
            });

        console.log(data);
    }

    return (
        <Modal show={props.open} title={"Session Erstellen"} onClose={props.onClose}>
            <form onSubmit={createSession}>
                <Input label={"Trainingstyp"} readOnly disabled value={props.trainingRequest?.training_type?.name} />
                <RenderIf
                    truthValue={props.trainingRequest?.training_station?.callsign != null}
                    elementTrue={<Input label={"Station"} className={"mt-5"} readOnly disabled value={props.trainingRequest?.training_station?.callsign} />}
                />

                <Separator />

                <Input name={"date"} required label={"Datum (UTC)"} labelSmall type={"datetime-local"} value={dayjs().utc().format("YYYY-MM-DD HH:mm")} />

                <div className={"w-full mt-4"}>
                    <div className={"flex justify-end"}>
                        <Button icon={<TbCalendarPlus size={20} />} type={"submit"} loading={submitting} color={COLOR_OPTS.PRIMARY} variant={"twoTone"}>
                            Erstellen
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
