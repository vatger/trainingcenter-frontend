import { TableColumn } from "react-data-table-component";
import { TrainingStationModel } from "../../../../../../models/TrainingStation.model";
import TrainingTypeViewTrainingStationsListTypes from "../../_types/TrainingTypeViewTrainingStationsList.types";
import { Table } from "../../../../../../components/ui/Table/Table";
import { Button } from "../../../../../../components/ui/Button/Button";
import { COLOR_OPTS } from "../../../../../../configs/theme/theme.config";
import { TbPlus } from "react-icons/all";
import { AddTrainingStationModalPartial } from "../_partials/AddTrainingStationModal.partial";
import { Dispatch, useState } from "react";
import { TrainingTypeModel } from "../../../../../../models/TrainingType.model";

export function TrainingTypeViewTrainingStationsSubpage(props: {
    loading: boolean;
    trainingType: TrainingTypeModel | undefined;
    setTrainingType: Dispatch<TrainingTypeModel | undefined>;
}) {
    const [addStationModalOpen, setAddStationModalOpen] = useState<boolean>(false);

    const columns: (TableColumn<TrainingStationModel> & { searchable?: boolean })[] = TrainingTypeViewTrainingStationsListTypes.getColumns();

    function addTrainingStation(station: TrainingStationModel) {
        let newStations = [...(props.trainingType?.training_stations ?? [])];
        newStations.push(station);
        newStations.sort((a, b) => {
            return a.id < b.id ? -1 : 1;
        });

        props.setTrainingType({ ...(props.trainingType ?? ({} as TrainingTypeModel)), training_stations: newStations });
    }

    function removeTrainingStation(station: TrainingStationModel) {
        let newStations = props.trainingType?.training_stations?.filter((t: TrainingStationModel) => {
            return t.id != station.id;
        });

        props.setTrainingType({ ...(props.trainingType ?? ({} as TrainingTypeModel)), training_stations: newStations });
    }

    return (
        <>
            <AddTrainingStationModalPartial
                open={addStationModalOpen}
                onClose={() => setAddStationModalOpen(false)}
                trainingStations={props.trainingType?.training_stations ?? []}
                onSelect={addTrainingStation}
                onRemove={removeTrainingStation}
            />

            <Table searchable columns={columns} data={props.trainingType?.training_stations ?? []} loading={props.loading} />

            <Button variant={"twoTone"} onClick={() => setAddStationModalOpen(true)} color={COLOR_OPTS.PRIMARY} icon={<TbPlus size={20} />}>
                Station hinzufügen
            </Button>
        </>
    );
}
