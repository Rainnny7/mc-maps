"use client";

import {createContext, ReactElement, ReactNode, useContext, useState,} from "react";
import {ServerPlatform} from "@/types/server-platform";

/**
 * The props for the filter context.
 */
interface FilterContextProps {
    searchQuery: string;
    search: (query: string) => void;

    filteredPlatform: ServerPlatform | undefined;
    filterPlatform: (platform: ServerPlatform | undefined) => void;

    filteredTags: string[] | undefined;
    filterTags: (tags: string[] | undefined) => void;

    filteredYears: number[] | undefined;
    filterYears: (years: number[] | undefined) => void;

    clearFilters: () => void;
}
const FilterContext = createContext<FilterContextProps | undefined>(undefined);

/**
 * The provider used to store the state of the filter.
 *
 * @param children the children to provide to
 */
export const MapsFilterProvider = ({
    children,
}: {
    children: ReactNode;
}): ReactElement => {
    // Create the states
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredPlatform, setFilteredPlatform] = useState<
        ServerPlatform | undefined
    >(undefined);
    const [filteredTags, setFilteredTags] = useState<string[] | undefined>(
        undefined
    );
    const [filteredYears, setFilteredYears] = useState<number[] | undefined>(
        undefined
    );

    // Create the filter functions
    const search = (query: string) => setSearchQuery(query);
    const filterPlatform = (platform: ServerPlatform | undefined) =>
        setFilteredPlatform(platform);
    const filterTags = (tags: string[] | undefined) => setFilteredTags(tags);
    const filterYears = (years: number[] | undefined) =>
        setFilteredYears(years);

    const clearFilters = () => {
        setSearchQuery("");
        setFilteredPlatform(undefined);
        setFilteredTags(undefined);
        setFilteredYears(undefined);
    };

    // Provide the context
    return (
        <FilterContext.Provider
            value={{
                searchQuery,
                search,
                filteredPlatform,
                filterPlatform,
                filteredTags,
                filterTags,
                filteredYears,
                filterYears,
                clearFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

/**
 * Use the filter context.
 */
export const useMapsFilter = (): FilterContextProps => {
    const context = useContext(FilterContext);
    if (!context)
        throw new Error(
            "useMapsFilter must be used within a MapsFilterProvider"
        );
    return context;
};
