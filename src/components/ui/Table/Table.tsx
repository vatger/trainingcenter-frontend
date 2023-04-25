import { TableProps } from "./Table.props";
import { Input } from "../Input/Input";
import DataTable, { TableColumn } from "react-data-table-component";
import { TbSortAscending, TbSortDescending } from "react-icons/all";
import { Spinner } from "../Spinner/Spinner";
import { RenderIf } from "../../conditionals/RenderIf";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../utils/hooks/useDebounce";
import { search } from "./Table.helper";
import { Skeleton } from "../Skeleton/Skeleton";

const TABLE_PAGINATION_PER_PAGE_DEFAULT = 15;

export function Table(props: TableProps) {
    const [searchInput, setSearchInput] = useState<string>("");
    const debouncedSearch = useDebounce<string>(searchInput, 250);

    const [data, setData] = useState<Object[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (debouncedSearch.length === 0) {
            setData(props.data);
            return;
        }

        setData(search(props.columns, props.data, debouncedSearch));
    }, [debouncedSearch]);

    useEffect(() => {
        setData(props.data);
        setLoading(props.loading ?? false);
    }, [props.data, props.loading]);

    let shouldPaginate = props.paginate ?? data.length > (props.paginationPerPage ?? TABLE_PAGINATION_PER_PAGE_DEFAULT);

    return (
        <>
            <div className={`${props.className ?? ""} ${shouldPaginate ? "" : "mb-5"}`}>
                <RenderIf
                    truthValue={props.searchable ?? false}
                    elementTrue={
                        <div className={"flex sm:flex-row flex-col justify-end mb-3"}>
                            <span className={"sm:pr-3 sm:pb-0 pb-1 my-auto"}>Suchen: </span>
                            <Input
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                disabled={props.loading}
                                className={"min-w-[25%]"}
                                placeholder={props.searchPlaceholder ?? "Search..."}
                            />
                        </div>
                    }
                />

                <DataTable
                    sortIcon={<TbSortDescending className={"ml-2"} />}
                    data={data}
                    columns={props.columns}
                    pagination={shouldPaginate}
                    paginationPerPage={props.paginationPerPage ?? TABLE_PAGINATION_PER_PAGE_DEFAULT}
                    paginationRowsPerPageOptions={[5, 10, 15, 30, 50, 100]}
                    className={"table-default tab-hide-scrollbar"}
                    progressPending={loading}
                    progressComponent={<Spinner className={"mt-7"} size={35} />}
                    persistTableHead
                />
            </div>
        </>
    );
}
