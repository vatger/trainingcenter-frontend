import { PageHeader } from "@/components/ui/PageHeader/PageHeader";
import { Card } from "@/components/ui/Card/Card";
import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input/Input";
import { TbFilePlus, TbId, TbPlus } from "react-icons/tb";
import { Separator } from "@/components/ui/Separator/Separator";
import { CommonRegexp } from "@/core/Config";
import { Select } from "@/components/ui/Select/Select";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import useApi from "@/utils/hooks/useApi";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import { MapArray } from "@/components/conditionals/MapArray";
import { RenderIf } from "@/components/conditionals/RenderIf";
import { Button } from "@/components/ui/Button/Button";
import { Table } from "@/components/ui/Table/Table";
import EGCListTypes from "@/pages/administration/lm/endorsement-group/create/_types/EGCStationList.types";
import FormHelper from "@/utils/helper/FormHelper";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";
import { EndorsementGroupModel } from "@/models/EndorsementGroupModel";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

export function EndorsementGroupCreateView() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [selectedTrainingStation, setSelectedTrainingStation] = useState<string | undefined>(undefined);
    const [trainingStationIDs, setTrainingStationIDs] = useState<number[]>([]);

    const { loading: loadingStations, data: trainingStations } = useApi<TrainingStationModel[]>({
        url: "/administration/training-station",
        method: "get",
    });

    function addTrainingStation() {
        const newTrainingStationID = Number(selectedTrainingStation);

        if (trainingStationIDs.indexOf(newTrainingStationID) != -1) {
            return;
        }

        setTrainingStationIDs([...trainingStationIDs, newTrainingStationID]);
        setSelectedTrainingStation(undefined);
    }

    function createEndorsementGroup(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);

        const data = FormHelper.getEntries(e.target);
        data["training_station_ids"] = trainingStationIDs;

        axiosInstance
            .post("/administration/endorsement-group", data)
            .then((res: AxiosResponse) => {
                const eg = res.data as EndorsementGroupModel;
                ToastHelper.success("Freigabegruppe erfolgreich erstellt");
                navigate(`/administration/endorsement-group/${eg.id}`);
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Erstellen der Freigabegruppe");
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    return (
        <>
            <PageHeader title={"Freigabegruppe Erstellen"} hideBackLink />

            <RenderIf
                truthValue={loadingStations}
                elementTrue={<></>}
                elementFalse={
                    <Card>
                        <form onSubmit={createEndorsementGroup}>
                            <Input
                                name={"name"}
                                type={"text"}
                                maxLength={70}
                                description={"Name der Freigabegruppe"}
                                labelSmall
                                placeholder={"Frankfurt up to tower"}
                                label={"Name"}
                                required
                                regex={CommonRegexp.NOT_EMPTY}
                                regexMatchEmpty
                                regexCheckInitial
                                preIcon={<TbId size={20} />}
                            />

                            <Select
                                label={"Trainingsstation Hinzufügen"}
                                labelSmall
                                className={"mt-5"}
                                onChange={v => {
                                    if (v == "-1") {
                                        setSelectedTrainingStation(undefined);
                                        return;
                                    }
                                    setSelectedTrainingStation(v);
                                }}
                                value={selectedTrainingStation ?? "-1"}>
                                <option value={"-1"} disabled>
                                    Trainingsstation Auswählen
                                </option>
                                <MapArray
                                    data={trainingStations?.filter(t => trainingStationIDs.indexOf(t.id) == -1) ?? []}
                                    mapFunction={(station: TrainingStationModel, index) => {
                                        return (
                                            <option value={station.id.toString()}>{`${station.callsign.toUpperCase()} (${station.frequency.toFixed(
                                                3
                                            )})`}</option>
                                        );
                                    }}
                                />
                            </Select>

                            <Button
                                variant={"twoTone"}
                                color={COLOR_OPTS.PRIMARY}
                                className={"mt-3"}
                                disabled={selectedTrainingStation == null || selectedTrainingStation == "-1"}
                                icon={<TbPlus size={20} />}
                                size={SIZE_OPTS.SM}
                                onClick={() => {
                                    addTrainingStation();
                                }}>
                                Hinzufügen
                            </Button>

                            <Separator />

                            <Table
                                columns={EGCListTypes.getColumns(trainingStationIDs, setTrainingStationIDs)}
                                data={trainingStations?.filter(t => trainingStationIDs.indexOf(t.id) != -1) ?? []}
                            />

                            <Separator />

                            <Button type={"submit"} loading={submitting} icon={<TbFilePlus size={20} />} variant={"twoTone"} color={COLOR_OPTS.PRIMARY}>
                                Freigabegruppe Erstellen
                            </Button>
                        </form>
                    </Card>
                }
            />
        </>
    );
}