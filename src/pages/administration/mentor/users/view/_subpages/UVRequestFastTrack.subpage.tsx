import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Card } from "@/components/ui/Card/Card";
import { FileUpload } from "@/components/ui/Upload/FileUpload";
import { FormEvent, useState } from "react";
import { TbActivity, TbId, TbListCheck } from "react-icons/tb";
import { Input } from "@/components/ui/Input/Input";
import { Separator } from "@/components/ui/Separator/Separator";
import { useParams } from "react-router-dom";
import { Select } from "@/components/ui/Select/Select";
import { Badge } from "@/components/ui/Badge/Badge";
import { COLOR_OPTS, TYPE_OPTS } from "@/assets/theme.config";
import { AxiosProgressEvent, AxiosResponse } from "axios";
import { TextArea } from "@/components/ui/Textarea/TextArea";
import { TableColumn } from "react-data-table-component";
import { FastTrackRequestModel } from "@/models/FastTrackRequestModel";
import FastTrackListTypes from "../_types/UVFastTrackList.types";
import { Table } from "@/components/ui/Table/Table";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { Alert } from "@/components/ui/Alert/Alert";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import useApi from "@/utils/hooks/useApi";
import ToastHelper from "@/utils/helper/ToastHelper";
import { E_VATSIM_RATING } from "@/utils/helper/vatsim/AtcRatingHelper";

export function RequestFastTrackView() {
    const { user_id } = useParams();

    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [fileList, setFileList] = useState<File[]>([]);

    const {
        data: fastTracks,
        setData: setFastTracks,
        loading: loadingFTRequests,
    } = useApi<FastTrackRequestModel[]>({
        url: "/administration/fast-track/user",
        params: {
            user_id: user_id,
        },
        method: "get",
    });

    function createFastTrackRequest(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsUploading(true);

        // Form Data required, cannot use formhelper here!
        const formData = new FormData(e.target as HTMLFormElement);

        // Append files
        fileList.forEach(f => {
            formData.append("files", f);
        });

        // Append extra info
        formData.append("user_id", user_id ?? "-1");

        axiosInstance
            .post("/administration/fast-track", formData, {
                onUploadProgress: (e: AxiosProgressEvent) => handleUploadProgressChange,
                timeout: 60_000,
            })
            .then((res: AxiosResponse) => {
                const data = res.data as FastTrackRequestModel;
                setUploadProgress(0);
                setFastTracks([...(fastTracks ?? []), data]);
                ToastHelper.success("Fast-Track Request erfolgreich erstellt.");
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Erstellen des Fast-Track Requests");
            })
            .then(() => setIsUploading(false));
    }

    function handleUploadProgressChange(e: AxiosProgressEvent) {
        setUploadProgress(e.progress ?? 0);
    }

    return (
        <>
            <PageHeader title={"Fast-Track Beantragen"} />

            <Card
                header={"Fast-Track Requests"}
                className={"mb-7"}
                headerBorder
                headerExtra={<Badge color={COLOR_OPTS.PRIMARY}>{fastTracks?.length ?? "Laden..."}</Badge>}>
                <Table columns={FastTrackListTypes.getColumns()} data={fastTracks ?? []} loading={loadingFTRequests} paginationPerPage={5} />
            </Card>

            <Card header={"Fast-Track Request Erstellen"} headerBorder>
                <RenderIf
                    truthValue={fastTracks?.find(ft => ft.status != 4 && ft.status != 5) != null}
                    elementTrue={
                        <Alert type={TYPE_OPTS.DANGER} showIcon rounded>
                            Es gibt bereits einen aktiven Fast-Track Request. Warte bitte, bis dieser abgeschlossen ist, um einen neuen Request erstellen zu
                            können.
                        </Alert>
                    }
                    elementFalse={
                        <form onSubmit={createFastTrackRequest}>
                            <div className={"grid grid-cols-1 md:grid-cols-2 md:gap-5"}>
                                <Input type={"text"} labelSmall label={"Mitglied"} name={"user_id"} value={user_id} disabled preIcon={<TbId size={20} />} />
                                <Select
                                    label={"Rating"}
                                    className={"flex flex-col mt-5 md:mt-0"}
                                    labelSmall
                                    required
                                    name={"rating"}
                                    preIcon={<TbActivity size={20} />}>
                                    <option value={E_VATSIM_RATING.S2}>{"S2"}</option>
                                    <option value={E_VATSIM_RATING.S3}>{"S3"}</option>
                                </Select>
                            </div>

                            <div>
                                <div className={"mt-5"}>
                                    <TextArea
                                        label={"Kommentar"}
                                        description={"Weitere Informationen die für das ATD wichtig sein könnten (optional)"}
                                        labelSmall
                                        name={"description"}
                                    />
                                </div>
                            </div>

                            <Separator />

                            <h6 className={"text-sm"}>Dateiupload</h6>
                            <FileUpload
                                accept={["jpg", "png"]}
                                isUploading={isUploading}
                                progress={uploadProgress}
                                fileLimit={loadingFTRequests ? 0 : 1}
                                showSuccess={false}
                                onFileChange={setFileList}
                                customButtonText={"Fast-Track Request Erstellen"}
                                customButtonIcon={<TbListCheck size={20} />}
                                buttonIsSubmit
                                inputName={"files"}
                            />
                        </form>
                    }
                />
            </Card>
        </>
    );
}
