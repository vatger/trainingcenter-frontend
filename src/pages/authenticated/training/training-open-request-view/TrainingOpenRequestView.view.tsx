import { PageHeader } from "../../../../components/ui/PageHeader/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../../../components/ui/Card/Card";
import { Input } from "../../../../components/ui/Input/Input";
import { TbCalendar, TbCalendarEvent, TbEye, TbId, TbListCheck, TbRadar, TbTrash } from "react-icons/all";
import React, { useState } from "react";
import TrainingRequestService from "../../../../services/training-request/TrainingRequestService";
import { Button } from "../../../../components/ui/Button/Button";
import { Separator } from "../../../../components/ui/Separator/Separator";
import { COLOR_OPTS } from "../../../../assets/theme.config";
import moment from "moment";
import StringHelper from "../../../../utils/helper/StringHelper";
import { TextArea } from "../../../../components/ui/Textarea/TextArea";
import { RenderIf } from "../../../../components/conditionals/RenderIf";
import { DeleteTrainingRequestModalPartial } from "../../course/course-active-view/_partials/DeleteTrainingRequestModal.partial";
import { TrainingRequestModel } from "../../../../models/TrainingRequestModel";
import dayjs from "dayjs";
import { Config } from "../../../../core/Config";

export function TrainingOpenRequestViewView() {
    const navigate = useNavigate();
    const { uuid: training_request_uuid } = useParams();

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const { trainingRequest, loading: loadingTrainingRequest } = TrainingRequestService.getByUUID(training_request_uuid);

    return (
        <>
            <PageHeader title={"Trainingsanfrage Verwalten"} />

            <Card>
                <Input labelSmall label={"UUID"} preIcon={<TbId size={20} />} disabled value={training_request_uuid} />

                <Input
                    labelSmall
                    className={"mt-5"}
                    label={"Zuletzt aktualisiert (UTC)"}
                    preIcon={<TbCalendarEvent size={20} />}
                    disabled
                    value={dayjs.utc(trainingRequest?.updatedAt).format(Config.DATETIME_FORMAT)}
                />

                <Separator />

                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                    <Input
                        labelSmall
                        label={"Anfrage Datum (UTC)"}
                        className={"flex flex-col"}
                        inputClassName={"mt-auto"}
                        description={
                            "Dies ist das Datum wann du die Anfrage erstellt hast. Die Wartezeit auf der Warteliste beginnt" + "entsprechend an diesem Tag"
                        }
                        preIcon={<TbCalendar size={20} />}
                        disabled
                        value={moment(trainingRequest?.createdAt).utc().format("DD.MM.YYYY HH:mm")}
                    />

                    <Input
                        labelSmall
                        label={"Läuft Ab (UTC)"}
                        className={"flex flex-col"}
                        inputClassName={"mt-auto"}
                        description={
                            "Du bekommst zum Ablaufdatum eine E-Mail von uns, in der Du dein weiteres Interesse an " +
                            "diesem Training bestätigen musst. Falls dies nicht innerhalb von x Wochen bestätigt wird, verfällt " +
                            "deine Anfrage automatisch."
                        }
                        preIcon={<TbCalendarEvent size={20} />}
                        disabled
                        value={moment(trainingRequest?.expires).utc().format("DD.MM.YYYY HH:mm")}
                    />
                </div>

                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"}>
                    <Input
                        labelSmall
                        label={"Kurs"}
                        className={"flex flex-col"}
                        inputClassName={"mt-auto"}
                        preIcon={<TbId size={20} />}
                        disabled
                        value={trainingRequest?.course?.name}
                    />

                    <Input
                        labelSmall
                        label={"Trainingstyp"}
                        className={"flex flex-col"}
                        inputClassName={"mt-auto"}
                        preIcon={<TbId size={20} />}
                        disabled
                        value={`${trainingRequest?.training_type?.name} (${trainingRequest?.training_type?.type})`}
                    />
                </div>

                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"}>
                    <Input
                        labelSmall
                        label={"Station"}
                        className={"flex flex-col"}
                        inputClassName={"mt-auto"}
                        preIcon={<TbRadar size={20} />}
                        disabled
                        value={trainingRequest?.training_station == null ? "N/A" : trainingRequest.training_station.callsign}
                    />

                    <Input
                        labelSmall
                        label={"Status"}
                        className={"flex flex-col"}
                        inputClassName={"mt-auto"}
                        preIcon={<TbListCheck size={20} />}
                        disabled
                        value={
                            StringHelper.capitalize(trainingRequest?.status) +
                            (trainingRequest?.training_session?.date != null
                                ? ` (${dayjs.utc(trainingRequest.training_session.date).format(Config.DATETIME_FORMAT)} UTC)`
                                : "")
                        }
                    />
                </div>

                <TextArea
                    className={"mt-5"}
                    label={"Kommentar"}
                    labelSmall
                    value={trainingRequest?.comment == null ? "N/A" : trainingRequest.comment}
                    disabled
                />

                <RenderIf
                    truthValue={trainingRequest?.training_session != null}
                    elementTrue={
                        <>
                            <Separator />

                            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"}>
                                <Input
                                    labelSmall
                                    label={"Session Datum (UTC)"}
                                    className={"flex flex-col"}
                                    inputClassName={"mt-auto"}
                                    preIcon={<TbCalendar size={20} />}
                                    disabled
                                    value={moment(trainingRequest?.training_session?.date).utc().format("DD.MM.YYYY HH:mm")}
                                />

                                <Input
                                    labelSmall
                                    label={"Mentor"}
                                    className={"flex flex-col"}
                                    inputClassName={"mt-auto"}
                                    preIcon={<TbListCheck size={20} />}
                                    disabled
                                    value={`${trainingRequest?.training_session?.mentor?.first_name} ${trainingRequest?.training_session?.mentor?.last_name} (${trainingRequest?.training_session?.mentor?.id})`}
                                />
                            </div>
                        </>
                    }
                />

                <Separator />

                <div className={"flex lg:flex-row flex-col"}>
                    <Button
                        className={"lg:mr-3"}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}
                        onClick={() => navigate("/course/active/" + trainingRequest?.course?.uuid)}
                        icon={<TbEye size={20} />}>
                        Kurs Ansehen
                    </Button>

                    <RenderIf
                        truthValue={trainingRequest?.status == "requested" && trainingRequest.training_session == null}
                        elementTrue={
                            <Button
                                className={"lg:mt-0 mt-3"}
                                variant={"twoTone"}
                                onClick={() => {
                                    setShowDeleteModal(true);
                                }}
                                color={COLOR_OPTS.DANGER}
                                disabled={trainingRequest?.status != "requested" || trainingRequest.training_session != null}
                                icon={<TbTrash size={20} />}>
                                Anfrage Löschen
                            </Button>
                        }
                    />
                </div>
            </Card>

            <DeleteTrainingRequestModalPartial
                open={showDeleteModal}
                trainingRequest={trainingRequest}
                onClose={() => setShowDeleteModal(false)}
                onDelete={(tr?: TrainingRequestModel) => {
                    if (tr == null) return;

                    if (trainingRequest?.course?.uuid == null) {
                        navigate(-1);
                    } else {
                        navigate(`/course/active/${trainingRequest?.course?.uuid}`);
                    }
                }}
            />
        </>
    );
}
