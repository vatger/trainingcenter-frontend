import { PageHeader } from "../../../../../components/ui/PageHeader/PageHeader";
import TrainingRequestAdminService from "../../../../../services/training-request/TrainingRequestAdminService";
import { Table } from "../../../../../components/ui/Table/Table";
import { TableColumn } from "react-data-table-component";
import { TrainingRequestModel } from "../../../../../models/TrainingRequestModel";
import OpenRequestListTypes from "./_types/OpenRequestList.types";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../../../components/ui/Input/Input";
import { Button } from "../../../../../components/ui/Button/Button";
import { TbFilter } from "react-icons/all";
import { COLOR_OPTS } from "../../../../../assets/theme.config";
import { useState } from "react";
import { useDebounce } from "../../../../../utils/hooks/useDebounce";
import { useFilter } from "../../../../../utils/hooks/useFilter";
import { fuzzySearch } from "../../../../../utils/helper/fuzzysearch/FuzzySearchHelper";
import { Card } from "../../../../../components/ui/Card/Card";

type SearchFilter = {
    available_only: boolean;
};

const filterTrainingRequestFunction = (trainingRequest: TrainingRequestModel, searchValue: string) => {
    return fuzzySearch(searchValue, [trainingRequest.training_type?.name ?? ""]).length > 0;
};

export function OpenRequestListView() {
    const navigate = useNavigate();
    const { trainingRequests, loading } = TrainingRequestAdminService.getOpen();

    const [searchFilter, setSearchFilter] = useState<SearchFilter>({ available_only: false });
    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const debouncedInput = useDebounce(searchInputValue, 250);

    const columns: TableColumn<TrainingRequestModel>[] = OpenRequestListTypes.getColumns(navigate);
    const filteredTrainingRequests = useFilter<TrainingRequestModel>(trainingRequests, searchInputValue, debouncedInput, filterTrainingRequestFunction);

    return (
        <>
            <PageHeader title={"Offene Trainingsanfragen"} hideBackLink />

            <Card>
                <div className={"flex w-full lg:flex-row flex-col justify-between"}>
                    <Input
                        value={searchInputValue}
                        onChange={e => setSearchInputValue(e.target.value)}
                        className={"mb-2 w-full"}
                        disabled={loading}
                        label={"Kurse Filtern"}
                        placeholder={trainingRequests?.length > 0 ? trainingRequests[0].training_type?.name : "Frankfurt S1 Lesson"}
                    />

                    <Button
                        disabled={loading}
                        className={"lg:ml-2 mb-2 mt-auto h-[39px]"}
                        variant={"twoTone"}
                        icon={<TbFilter size={20} />}
                        color={COLOR_OPTS.PRIMARY}>
                        Filter Hinzufügen (TODO)
                    </Button>
                </div>
            </Card>

            <Card className={"mt-5"}>
                <Table paginate paginationPerPage={15} className={"mt-5"} columns={columns} data={filteredTrainingRequests} loading={loading} />
            </Card>
        </>
    );
}
