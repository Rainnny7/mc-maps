"use client";

import { ReactElement } from "react";
import { Input } from "@/components/ui/input";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useMapsFilter } from "@/providers/maps-filter-provider";

const SearchBar = (): ReactElement => {
    const { searchQuery, search } = useMapsFilter();
    return (
        <div className="relative text-sm">
            <HiMagnifyingGlass className="absolute left-2 h-full size-4" />
            <Input
                className="pl-7"
                type="search"
                placeholder="Search Query..."
                maxLength={100}
                value={searchQuery}
                onChange={(event) => search(event.target.value)}
            />
        </div>
    );
};
export default SearchBar;
