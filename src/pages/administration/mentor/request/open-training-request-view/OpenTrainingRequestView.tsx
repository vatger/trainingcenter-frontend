import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import TrainingRequestAdminService from "../../../../../services/training-request/TrainingRequestAdminService";
import { Card } from "../../../../../components/ui/Card/Card";
import { Input } from "../../../../../components/ui/Input/Input";
import { TbCalendarEvent, TbCalendarPlus, TbEye, TbId, TbListCheck, TbRadar, TbTrash } from "react-icons/all";
import dayjs from "dayjs";
import { Config } from "../../../../../core/Config";
import { Separator } from "../../../../../components/ui/Separator/Separator";
import StringHelper from "../../../../../utils/helper/StringHelper";
import { TextArea } from "../../../../../components/ui/Textarea/TextArea";
import React, { useState } from "react";
import { Button } from "../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../assets/theme.config";
import { DeleteTrainingRequestModalPartial } from "./_partials/DeleteTrainingRequestModalPartial";
import { TrainingRequestModel } from "../../../../../models/TrainingRequestModel";
import { CreateSessionModalPartial } from "./_partials/CreateSessionModalPartial";

export function OpenTrainingRequestView() {
    const navigate = useNavigate();
    const { uuid: training_request_uuid } = useParams();

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [createSessionModalOpen, setCreateSessionModalOpen] = useState<boolean>(false);
    const { trainingRequest, loading } = TrainingRequestAdminService.getByUUID(training_request_uuid);

    return (
        <>
            <PageHeader title={"Trainingsanfrage Ansehen"} />

            <Card>
                <Input label={"UUID"} labelSmall preIcon={<TbId size={20} />} disabled readOnly value={trainingRequest?.uuid} />
                <Input
                    className={"mt-5"}
                    label={"Anfrage Datum"}
                    labelSmall
                    preIcon={<TbCalendarEvent size={20} />}
                    disabled
                    readOnly
                    value={dayjs.utc(trainingRequest?.createdAt).format(Config.DATETIME_FORMAT)}
                />

                <Separator />

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
                        value={StringHelper.capitalize(trainingRequest?.status)}
                    />
                </div>

                <TextArea
                    className={"mt-5"}
                    label={"Kommentar"}
                    labelSmall
                    value={trainingRequest?.comment == null ? "N/A" : trainingRequest.comment}
                    disabled
                />

                <Separator />

                <div className={"flex lg:flex-row flex-col"}>
                    <Button
                        className={"lg:mr-3"}
                        variant={"twoTone"}
                        color={COLOR_OPTS.PRIMARY}
                        onClick={() => setCreateSessionModalOpen(true)}
                        icon={<TbCalendarPlus size={20} />}>
                        Session Erstellen
                    </Button>

                    <Button
                        className={"lg:mt-0 mt-3"}
                        variant={"twoTone"}
                        color={COLOR_OPTS.DANGER}
                        onClick={() => setDeleteModalOpen(true)}
                        disabled={trainingRequest?.status != "requested" || trainingRequest.training_session != null}
                        icon={<TbTrash size={20} />}>
                        Löschen
                    </Button>
                </div>
            </Card>

            <CreateSessionModalPartial
                open={createSessionModalOpen}
                onClose={() => setCreateSessionModalOpen(false)}
                trainingRequest={trainingRequest}
                onCreate={() => {}}
            />

            <DeleteTrainingRequestModalPartial
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                trainingRequest={trainingRequest}
                onDelete={(tr?: TrainingRequestModel) => {
                    if (tr == null) return;

                    if (trainingRequest?.course?.uuid == null) {
                        navigate(-1);
                    } else {
                        navigate(`/administration/training-request/open`);
                    }
                }}
            />
        </>
    );
}
