import { Modal } from "../../../../../../components/ui/Modal/Modal";
import { Input } from "../../../../../../components/ui/Input/Input";
import { TbCircleCheck, TbSearch } from "react-icons/all";
import { useState } from "react";
import { useDebounce } from "../../../../../../utils/hooks/useDebounce";
import { MapArray } from "../../../../../../components/conditionals/MapArray";
import { RenderIf } from "../../../../../../components/conditionals/RenderIf";
import { Separator } from "../../../../../../components/ui/Separator/Separator";
import { useFilter } from "../../../../../../utils/hooks/useFilter";
import { fuzzySearch } from "../../../../../../utils/helper/fuzzysearch/FuzzySearchHelper";
import { TrainingStationModel } from "../../../../../../models/TrainingStationModel";
import TrainingStationAdminService from "../../../../../../services/training-station/TrainingStationAdminService";

const filterTrainingStationTemplateFunction = (logTemplate: TrainingStationModel, searchValue: string) => {
    return fuzzySearch(searchValue, [logTemplate.callsign]).length > 0;
};

export function TTVAddTrainingStationModal(props: {
    open: boolean;
    onClose: () => any;
    onSelect: (trainingStation: TrainingStationModel) => any;
    onRemove: (trainingStation: TrainingStationModel) => any;
    trainingStations: TrainingStationModel[];
}) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedValue = useDebounce<string>(searchQuery, 300);

    const { trainingStations, loading, loadingError } = TrainingStationAdminService.getAll();
    const filteredSkillTemplates = useFilter<TrainingStationModel>(trainingStations, searchQuery, debouncedValue, filterTrainingStationTemplateFunction, true);

    return (
        <Modal show={props.open} onClose={props.onClose} title={"Trainingsstation Suchen"}>
            <Input
                className={"mb-3"}
                type={"text"}
                value={searchQuery}
                loading={loading}
                onChange={e => setSearchQuery(e.target.value)}
                preIcon={<TbSearch size={20} />}
                placeholder={"EDDF_S_TWR"}
            />

            <RenderIf
                truthValue={filteredSkillTemplates.length > 0}
                elementTrue={
                    <>
                        <span>
                            Die Suche ergab <strong>{filteredSkillTemplates.length}</strong> Treffer.
                        </span>

                        <Separator className={"mt-1"} />
                    </>
                }
            />

            <div className={"max-h-[35vh] side-nav-hide-scrollbar overflow-y-auto"}>
                <MapArray
                    data={filteredSkillTemplates}
                    mapFunction={(value: TrainingStationModel, index) => {
                        // Check if user is NOT a part of this group yet, then allow addition!
                        if (props.trainingStations.find(t => t.id == value.id) == null) {
                            return (
                                <div
                                    key={index}
                                    onClick={() => props.onSelect(value)}
                                    className={
                                        "flex mt-2 justify-between flex-row rounded border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 transition-all border hover:shadow-sm p-3 cursor-pointer"
                                    }>
                                    <span className={"flex"}>{`${value.callsign} | ${value.frequency.toFixed(3)}`} </span>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={index}
                                onClick={() => props.onRemove(value)}
                                className={
                                    "flex mt-2 justify-between flex-row rounded border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 transition-all border hover:shadow-sm p-3 cursor-pointer"
                                }>
                                <span className={"flex"}>{`${value.callsign} | ${value.frequency.toFixed(3)}`} </span>
                                <span>
                                    <TbCircleCheck size={20} className={"text-success"} />
                                </span>
                            </div>
                        );
                    }}
                />
            </div>
        </Modal>
    );
}
