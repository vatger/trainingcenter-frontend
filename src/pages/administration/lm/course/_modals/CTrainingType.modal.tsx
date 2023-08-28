import { Modal } from "../../../../../components/ui/Modal/Modal";
import { Input } from "../../../../../components/ui/Input/Input";
import { TbSearch } from "react-icons/all";
import { useState } from "react";
import { TrainingTypeModel } from "../../../../../models/TrainingTypeModel";
import TrainingTypeService from "../../../../../services/training-type/TrainingTypeAdminService";
import { useDebounce } from "../../../../../utils/hooks/useDebounce";
import { MapArray } from "../../../../../components/conditionals/MapArray";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import { Separator } from "../../../../../components/ui/Separator/Separator";
import { Badge } from "../../../../../components/ui/Badge/Badge";
import { useFilter } from "../../../../../utils/hooks/useFilter";
import { fuzzySearch } from "../../../../../utils/helper/fuzzysearch/FuzzySearchHelper";

const filterTrainingTypeFunction = (logTemplate: TrainingTypeModel, searchValue: string) => {
    return fuzzySearch(searchValue, [logTemplate.name, logTemplate.type]).length > 0;
};

export function CTrainingTypeModal(props: { open: boolean; onClose: () => any; onSelect: (tType: TrainingTypeModel) => any }) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedValue = useDebounce<string>(searchQuery, 250);

    const { trainingTypes, loading, loadingError } = TrainingTypeService.getAll();
    const filteredTrainingTypes = useFilter<TrainingTypeModel>(trainingTypes, searchQuery, debouncedValue, filterTrainingTypeFunction, true);

    return (
        <Modal show={props.open} onClose={props.onClose} title={"Trainingstypen Suchen"}>
            <Input
                className={"mb-3"}
                type={"text"}
                value={searchQuery}
                loading={loading}
                onChange={e => setSearchQuery(e.target.value)}
                preIcon={<TbSearch size={20} />}
                placeholder={"Frankfurt Tower Sim"}
            />

            <RenderIf
                truthValue={filteredTrainingTypes.length > 0}
                elementTrue={
                    <>
                        <span>
                            Die Suche ergab <strong>{filteredTrainingTypes.length}</strong> Treffer.
                        </span>
                        <Separator className={"mt-1"} />
                    </>
                }
            />

            <div className={"max-h-[35vh] side-nav-hide-scrollbar overflow-y-auto"}>
                <MapArray
                    data={filteredTrainingTypes}
                    mapFunction={(value: TrainingTypeModel, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    props.onSelect?.(value);
                                }}
                                className={
                                    "flex mt-2 justify-between flex-row rounded border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 transition-all border hover:shadow-sm p-3 cursor-pointer"
                                }>
                                <span className={"flex"}>{`${value.name} - #${value.id}`} </span>
                                <Badge>{value.type}</Badge>
                            </div>
                        );
                    }}
                />
            </div>
        </Modal>
    );
}
