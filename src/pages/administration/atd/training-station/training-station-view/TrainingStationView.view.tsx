import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import useApi from "@/utils/hooks/useApi";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/Card/Card";
import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input/Input";
import { TbActivity, TbCalendarTime, TbId, TbRefresh, TbRss, TbTrash } from "react-icons/tb";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { Select } from "@/components/ui/Select/Select";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { Separator } from "@/components/ui/Separator/Separator";
import FormHelper from "@/utils/helper/FormHelper";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";
import { TSVDeleteModal } from "@/pages/administration/atd/training-station/training-station-view/_modals/TSVDelete.modal";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { TSVSkeleton } from "@/pages/administration/atd/training-station/training-station-view/_skeletons/TSV.skeleton";

export function TrainingStationViewView() {
    const { id } = useParams();
    const {
        data: trainingStation,
        setData: setTrainingStation,
        loading: loadingTrainingStation,
    } = useApi<TrainingStationModel>({
        url: `/administration/training-station/${id}`,
        method: "get",
    });

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    function updateCourse(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);

        const data = FormHelper.getEntries(e.target);

        axiosInstance
            .patch(`/administration/training-station/${id}`, data)
            .then(() => {
                ToastHelper.success("Trainingsstation erfolgreich aktualisiert");
                setTrainingStation({ ...trainingStation!, updatedAt: new Date() });
            })
            .catch(() => {
                ToastHelper.error("Fehler beim aktualisieren der Trainingsstation");
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    return (
        <>
            <PageHeader title={"Trainingsstation Verwalten"} />

            <RenderIf
                truthValue={loadingTrainingStation}
                elementTrue={<TSVSkeleton />}
                elementFalse={
                    <Card>
                        <Input
                            labelSmall
                            label={"Zuletzt Aktualisiert (UTC)"}
                            className={"flex flex-col"}
                            disabled
                            preIcon={<TbCalendarTime size={20} />}
                            value={dayjs.utc(trainingStation?.updatedAt).format(Config.DATETIME_FORMAT)}
                        />

                        <Separator />

                        <form onSubmit={updateCourse}>
                            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                                <Input
                                    labelSmall
                                    name={"callsign"}
                                    label={"Callsign"}
                                    className={"flex flex-col"}
                                    preIcon={<TbId size={20} />}
                                    value={trainingStation?.callsign.toUpperCase()}
                                />

                                <Input
                                    labelSmall
                                    name={"frequency"}
                                    maxLength={7}
                                    label={"Frequenz"}
                                    className={"flex flex-col"}
                                    preIcon={<TbRss size={20} />}
                                    value={trainingStation?.frequency.toFixed(3)}
                                />
                            </div>

                            <Separator />

                            <div className={"flex flex-col lg:flex-row"}>
                                <Button
                                    icon={<TbRefresh size={20} />}
                                    onClick={() => {}}
                                    variant={"twoTone"}
                                    loading={submitting}
                                    type={"submit"}
                                    color={COLOR_OPTS.PRIMARY}>
                                    Aktualisieren
                                </Button>

                                <Button
                                    className={"mt-3 lg:mt-0 lg:ml-3"}
                                    icon={<TbTrash size={20} />}
                                    onClick={() => {
                                        setShowDeleteModal(true);
                                    }}
                                    disabled={submitting}
                                    variant={"twoTone"}
                                    color={COLOR_OPTS.DANGER}>
                                    Löschen
                                </Button>
                            </div>
                        </form>
                    </Card>
                }
            />

            <TSVDeleteModal
                show={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                }}
                trainingStation={trainingStation}
            />
        </>
    );
}
