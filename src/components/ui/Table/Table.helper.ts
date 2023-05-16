import {TableColumn} from "react-data-table-component";

export function search(headers: (TableColumn<any> & { searchable?: boolean })[], data: Object[], searchString: string): Object[] {
    const lowerCaseSearchString = searchString.toLowerCase();
    let searchableIndexArray: number[] = [];
    let filteredData: Object[] = [];

    headers.forEach((value, index) => {
        if (value.searchable) searchableIndexArray.push(index);
    });

    data.forEach(dataValue => {
        searchableIndexArray.forEach(value => {
            if (headers[value] == null) return;
            const selected = headers[value].selector?.(dataValue);
            if (selected == null) return;

            if (selected.toString().toLowerCase().indexOf(lowerCaseSearchString) !== -1) {
                filteredData.push(dataValue);
                return;
            }
        });
    });

    return filteredData;
}
