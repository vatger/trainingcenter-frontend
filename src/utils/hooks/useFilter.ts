import { useEffect, useState } from "react";

/**
 * Uses a user defined filter function to filter the provided data.
 * This can be used, for example, when filtering courses, users, ...
 * @param data - Array of all elements to apply filter to
 * @param searchValue - Non debounced search value
 * @param debouncedSearchValue - Debounced search value
 * @param filterFunction - Filter function
 * @param noEntriesIfSearchEmpty - Returns an empty array if no search value is provided
 */
export function useFilter<T>(
    data: T[],
    searchValue: string,
    debouncedSearchValue: string,
    filterFunction: (element: T, searchValue: string) => boolean,
    noEntriesIfSearchEmpty?: boolean
): T[] {
    const [filteredData, setFilteredData] = useState<T[]>(data);

    useEffect(() => {
        if (searchValue.length == 0) {
            if (noEntriesIfSearchEmpty) setFilteredData([]);
            else setFilteredData(data);

            return;
        }
        if (searchValue != debouncedSearchValue) return;

        const filtered: T[] = data.filter((value: T) => {
            return filterFunction(value, debouncedSearchValue);
        });

        setFilteredData(filtered);
    }, [searchValue, debouncedSearchValue]);

    return filteredData;
}
