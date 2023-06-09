import { TableColumn } from "react-data-table-component";

export type TableProps = {
    className?: string;

    columns: (TableColumn<any> & { searchable?: boolean })[];
    data: Array<object>;

    tableClassName?: string;

    paginate?: boolean;
    paginateElementCount?: number;

    searchable?: boolean;
    searchPlaceholder?: string;

    loading?: boolean;
    paginationPerPage?: number;
};
