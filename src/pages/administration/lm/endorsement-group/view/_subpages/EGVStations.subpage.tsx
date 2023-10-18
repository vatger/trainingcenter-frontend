import useApi from "@/utils/hooks/useApi";
import { TrainingStationModel } from "@/models/TrainingStationModel";
import { useParams } from "react-router-dom";
import { Table } from "@/components/ui/Table/Table";
import EGVStationsTypes from "@/pages/administration/lm/endorsement-group/view/_types/EGVStations.types";
import React, { useState } from "react";
import { MapArray } from "@/components/conditionals/MapArray";
import { Select } from "@/components/ui/Select/Select";
import { Separator } from "@/components/ui/Separator/Separator";
import { COLOR_OPTS, SIZE_OPTS } from "@/assets/theme.config";
import { TbPlus } from "react-icons/tb";
import { Button } from "@/components/ui/Button/Button";
import { axiosInstance } from "@/utils/network/AxiosInstance";
import ToastHelper from "@/utils/helper/ToastHelper";

export function EGVStationsSubpage() {
    const { id } = useParams();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [selectedTrainingStation, setSelectedTrainingStation] = useState<string | undefined>(undefined);

    const {
        loading: loadingEndorsementGroupStations,
        data: endorsementGroupStations,
        setData: setEndorsementGroupStations,
    } = useApi<TrainingStationModel[]>({
        url: `/administration/endorsement-group/${id}/stations`,
        method: "get",
    });

    const { loading: loadingStations, data: trainingStations } = useApi<TrainingStationModel[]>({
        url: "/administration/training-station",
        method: "get",
    });

    function addStation() {
        setIsSubmitting(true);
        const trainingStationID = Number(selectedTrainingStation);
        if (trainingStationID == Number.NaN || selectedTrainingStation == null) {
            setIsSubmitting(false);
            return;
        }

        const newStation = trainingStations?.find(t => t.id == trainingStationID);
        if (newStation == null) {
            setIsSubmitting(false);
            return;
        }

        axiosInstance
            .put(`/administration/endorsement-group/${id}/stations`, { training_station_id: trainingStationID })
            .then(() => {
                ToastHelper.success("Station erfolgreich hinzugefügt");
                setEndorsementGroupStations([...(endorsementGroupStations ?? []), newStation]);
                setSelectedTrainingStation(undefined);
            })
            .catch(() => {
                ToastHelper.error("Fehler beim Hinzufügen der Station");
            })
            .finally(() => setIsSubmitting(false));
    }

    function removeStation(stationID: number) {
        setIsSubmitting(true);

        axiosInstance
            .delete(`/administration/endorsement-group/${id}/stations`, {
                data: {
                    training_station_id: stationID,
                },
            })
            .then(() => {
                ToastHelper.success("Station erfolgreich entfernt");
                setEndorsementGroupStations(endorsementGroupStations?.filter(e => e.id != stationID));
            })
            .catch(() => {
                ToastHelper.error("Fehler beim entfernen der Station");
            })
            .finally(() => setIsSubmitting(false));
    }

    return (
        <>
            <Select
                label={"Trainingsstation Hinzufügen"}
                labelSmall
                disabled={loadingStations || loadingEndorsementGroupStations}
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
                    data={trainingStations?.filter(t => endorsementGroupStations?.find(e => e.id == t.id) == null) ?? []}
                    mapFunction={(station: TrainingStationModel, index) => {
                        return <option value={station.id.toString()}>{`${station.callsign.toUpperCase()} (${station.frequency.toFixed(3)})`}</option>;
                    }}
                />
            </Select>

            <Button
                variant={"twoTone"}
                color={COLOR_OPTS.PRIMARY}
                className={"mt-3"}
                disabled={isSubmitting || selectedTrainingStation == null || selectedTrainingStation == "-1"}
                icon={<TbPlus size={20} />}
                size={SIZE_OPTS.SM}
                onClick={addStation}>
                Hinzufügen
            </Button>

            <Separator />

            <Table
                columns={EGVStationsTypes.getColumns(removeStation, isSubmitting)}
                defaultSortField={1}
                data={endorsementGroupStations ?? []}
                loading={loadingEndorsementGroupStations}
                paginate
            />
        </>
    );
}
