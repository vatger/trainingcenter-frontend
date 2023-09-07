import { TrainingLogTemplateModel } from "../../../../../models/TrainingLogTemplateModel";
import { useState } from "react";
import { useDebounce } from "../../../../../utils/hooks/useDebounce";
import { Modal } from "../../../../../components/ui/Modal/Modal";
import { Input } from "../../../../../components/ui/Input/Input";
import { TbSearch } from "react-icons/tb";
import { RenderIf } from "../../../../../components/conditionals/RenderIf";
import { Separator } from "../../../../../components/ui/Separator/Separator";
import { MapArray } from "../../../../../components/conditionals/MapArray";
import { useFilter } from "../../../../../utils/hooks/useFilter";
import { fuzzySearch } from "../../../../../utils/helper/fuzzysearch/FuzzySearchHelper";
import TrainingLogTemplateAdminService from "../../../../../services/log-template/TrainingLogTemplateAdminService";
import { NetworkError } from "../../../../../components/errors/NetworkError";

const filterTrainingLogTemplateFunction = (logTemplate: TrainingLogTemplateModel, searchValue: string) => {
    return fuzzySearch(searchValue, [logTemplate.name]).length > 0;
};

export function TTAddLogTemplateModal(props: { open: boolean; onClose: () => any; onSelect: (logTemplate: TrainingLogTemplateModel) => any }) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedValue = useDebounce<string>(searchQuery, 250);

    const { trainingLogTemplates, loading, loadingError } = TrainingLogTemplateAdminService.getAll();
    const filteredTemplates = useFilter<TrainingLogTemplateModel>(trainingLogTemplates, searchQuery, debouncedValue, filterTrainingLogTemplateFunction, false);

    return (
        <Modal show={props.open} title={"Logvorlage Suchen"} onClose={() => props.onClose()}>
            <RenderIf
                truthValue={loadingError != null}
                elementTrue={
                    <NetworkError
                        error={loadingError?.error}
                        closeable={false}
                        custom_message={"Es ist ein Fehler beim Laden der Logvorlagen aufgetreten. Versuche bitte die Seite neuzuladen."}
                    />
                }
                elementFalse={
                    <>
                        <Input
                            className={"mb-3"}
                            type={"text"}
                            value={searchQuery}
                            loading={loading}
                            label={"Logvorlage"}
                            labelSmall
                            onChange={e => setSearchQuery(e.target.value)}
                            preIcon={<TbSearch size={20} />}
                            placeholder={trainingLogTemplates.length > 0 ? trainingLogTemplates[0].name : "Controller Practical Test"}
                        />

                        <RenderIf
                            truthValue={trainingLogTemplates.length > 0 && searchQuery.length > 0 && debouncedValue.length > 0}
                            elementTrue={
                                <>
                                    <span>
                                        Die Suche ergab <strong>{filteredTemplates.length}</strong> Treffer.
                                    </span>
                                    <Separator className={"mt-1"} />
                                </>
                            }
                        />

                        <div className={"max-h-[35vh] side-nav-hide-scrollbar overflow-y-auto"}>
                            <MapArray
                                data={filteredTemplates}
                                mapFunction={(value: TrainingLogTemplateModel, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => props.onSelect?.(value)}
                                            className={
                                                "flex mt-2 justify-between flex-row rounded border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 transition-all border hover:shadow-sm p-3 cursor-pointer"
                                            }>
                                            <span className={"flex"}>{`${value.name} - #${value.id}`} </span>
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    </>
                }
            />
        </Modal>
    );
}
