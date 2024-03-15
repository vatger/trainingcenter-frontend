import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Card } from "@/components/ui/Card/Card";
import useApi from "@/utils/hooks/useApi";
import { FastTrackRequestModel } from "@/models/FastTrackRequestModel";
import { useParams } from "react-router-dom";
import React, { FormEvent, useEffect, useState } from "react";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import { AxiosResponse } from "axios";
import { Buffer } from "buffer";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { Input } from "@/components/ui/Input/Input";
import { TbCalendar, TbId, TbRefresh } from "react-icons/tb";
import { getAtcRatingLong, getAtcRatingShort } from "@/utils/helper/vatsim/AtcRatingHelper";
import { Select } from "@/components/ui/Select/Select";
import { TextArea } from "@/components/ui/Textarea/TextArea";
import { Separator } from "@/components/ui/Separator/Separator";
import { Button } from "@/components/ui/Button/Button";
import { COLOR_OPTS } from "@/assets/theme.config";
import FormHelper from "@/utils/helper/FormHelper";
import ToastHelper from "@/utils/helper/ToastHelper";
import dayjs from "dayjs";
import { Config } from "@/core/Config";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";

const magicNumbers = {
    jpg: "ffd8ffe0",
    png: "89504e47",
    gif: "47494638",
};

export function FastTrackViewView() {
    const { id } = useParams();

    const {
        data: fastTrackRequest,
        loading: loadingFastTrackRequest,
        setData: setFastTrackRequest,
    } = useApi<FastTrackRequestModel>({
        url: `/administration/fast-track/${id}`,
        method: "get",
    });
    const [imageSource, setImageSource] = useState<string | undefined>(undefined);
    const [imageFormat, setImageFormat] = useState<"png" | "jpg" | "gif">("png");
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (id == null) return;

        axiosInstance.get(`/administration/fast-track/attachment/${id}`, { responseType: "arraybuffer" }).then((res: AxiosResponse) => {
            const base64 = Buffer.from(res.data, "binary").toString("base64");
            const magix = Buffer.from(res.data, "binary").toString("hex", 0, 4);

            if (magix == magicNumbers.jpg) setImageFormat("jpg");
            if (magix == magicNumbers.png) setImageFormat("png");
            if (magix == magicNumbers.gif) setImageFormat("gif");

            setImageSource(base64);
        });
    }, [id]);

    function updateFastTrack(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (id == null) {
            return;
        }
        setSubmitting(true);

        const data = FormHelper.getEntries(e.target);
        axiosInstance
            .patch(`/administration/fast-track/${id}`, data)
            .then((res: AxiosResponse) => {
                const data = res.data as FastTrackRequestModel;
                setFastTrackRequest(data);
                ToastHelper.success("Fast-Track Request erfolgreich aktualisiert");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Aktualisieren des Fast-Track Requests");
            })
            .finally(() => setSubmitting(false));
    }

    return (
        <>
            <PageHeader title={"Fast-Track Ansehen"} />

            <RenderIf
                truthValue={loadingFastTrackRequest}
                elementTrue={<Skeleton />}
                elementFalse={
                    <Card header={"Anfrage"} headerBorder>
                        <form onSubmit={updateFastTrack}>
                            <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5"}>
                                <Input
                                    label={"Benutzer"}
                                    labelSmall
                                    preIcon={<TbId size={20} />}
                                    disabled
                                    readOnly
                                    value={`${fastTrackRequest?.user?.first_name} ${fastTrackRequest?.user?.last_name} (${fastTrackRequest?.user_id})`}
                                />

                                <Input
                                    label={"Angefragt von"}
                                    labelSmall
                                    preIcon={<TbId size={20} />}
                                    disabled
                                    readOnly
                                    value={`${fastTrackRequest?.requested_by_user?.first_name} ${fastTrackRequest?.requested_by_user?.last_name} (${fastTrackRequest?.requested_by_user_id})`}
                                />

                                <Input
                                    label={"Rating"}
                                    labelSmall
                                    preIcon={<TbId size={20} />}
                                    disabled
                                    readOnly
                                    value={`${getAtcRatingLong(fastTrackRequest?.rating ?? -5)} (${getAtcRatingShort(fastTrackRequest?.rating ?? -5)})`}
                                />

                                <Input
                                    label={"Angefragt Am (UTC)"}
                                    labelSmall
                                    preIcon={<TbCalendar size={20} />}
                                    disabled
                                    readOnly
                                    value={dayjs.utc(fastTrackRequest?.createdAt).format(Config.DATETIME_FORMAT)}
                                />

                                <Input
                                    label={"Zuletzt Aktualisiert (UTC)"}
                                    labelSmall
                                    preIcon={<TbCalendar size={20} />}
                                    disabled
                                    readOnly
                                    value={dayjs.utc(fastTrackRequest?.updatedAt).format(Config.DATETIME_FORMAT)}
                                />
                            </div>

                            <TextArea
                                className={"mt-5"}
                                label={"Kommentar"}
                                disabled
                                description={"Kommentar des Erstellers des Requests"}
                                labelSmall
                                value={fastTrackRequest?.comment ?? "N/A"}
                            />

                            <Separator />

                            <Select label={"Status"} labelSmall name={"status"} defaultValue={fastTrackRequest?.status}>
                                {/*
                                        STATUS:
                                        0 -> Requested, not uploaded to ATSIM
                                        1 -> Uploaded, Test requested
                                        2 -> Test failed, request retry
                                        3 -> Intro done, request rating
                                        4 -> Request denied
                                        5 -> Completed with success
                                    */}
                                <option value="0">Reqested, Not uploaded to ATSIM</option>
                                <option value="1">Uploaded, Test requested</option>
                                <option value="2">Test failed, request retry</option>
                                <option value="3">Intro done, request rating</option>
                                <option value="4">Request denied</option>
                                <option value="5">Completed</option>
                            </Select>

                            <TextArea className={"mt-5"} label={"Kommentar"} name={"comment"} labelSmall value={fastTrackRequest?.response} />

                            <Separator />

                            <Button icon={<TbRefresh size={20} />} type={"submit"} loading={submitting} variant={"twoTone"} color={COLOR_OPTS.PRIMARY}>
                                Aktualisieren
                            </Button>
                        </form>
                    </Card>
                }
            />

            <Card className={"mt-5"} header={"Datei"} headerBorder>
                <RenderIf
                    truthValue={imageSource != null}
                    elementTrue={<img className={"max-h-72"} src={`data:image/${imageFormat};charset=utf-8;base64,${imageSource}`} alt={"image"} />}
                    elementFalse={<Spinner size={30} />}
                />
            </Card>
        </>
    );
}
