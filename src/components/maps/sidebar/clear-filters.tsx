"use client";

import { ReactElement } from "react";
import { useMapsFilter } from "@/providers/maps-filter-provider";
import { Button } from "@/components/ui/button";

const ClearFilters = (): ReactElement | undefined => {
    const {
        searchQuery,
        filteredPlatform,
        filteredTags,
        filteredYears,
        clearFilters,
    } = useMapsFilter();
    if (
        !searchQuery &&
        !filteredPlatform &&
        (!filteredTags || filteredTags.length < 1) &&
        !filteredYears
    ) {
        return undefined;
    }
    return (
        <Button
            className="mt-auto"
            variant="destructive"
            onClick={clearFilters}
        >
            Clear Filters
        </Button>
    );
};
export default ClearFilters;
