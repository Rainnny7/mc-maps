"use client";

import { ReactElement } from "react";
import { useMapsFilter } from "@/providers/maps-filter-provider";
import Combobox from "@/components/combobox";
import { ServerPlatform } from "@/types/server-platform";
import { MinecraftMap } from "@/models/map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

const MapsSidebar = ({ maps }: { maps: MinecraftMap[] }): ReactElement => (
    <div className="hidden sm:flex sticky min-h-52 h-[100vh] max-h-[calc(100vh-25rem)] min-w-32 w-48 lg:w-60 p-2.5 lg:p-3.5 flex-col gap-3 rounded-xl bg-background/75 border border-muted transition-all transform-gpu overflow-y-auto">
        <PlatformSelection />
        <YearSelection maps={maps} />
        <TagsSelection maps={maps} />
        <ClearFilters maps={maps} />
    </div>
);

const PlatformSelection = (): ReactElement => {
    const { filteredPlatform, filterPlatform } = useMapsFilter();
    return (
        <Combobox<ServerPlatform>
            name="Server Platform"
            placeholder="Filter by platform"
            items={[
                {
                    value: ServerPlatform.Java,
                    name: "Java Edition",
                },
                {
                    value: ServerPlatform.Bedrock,
                    name: "Bedrock Edition",
                },
            ]}
            value={filteredPlatform}
            onValueChange={filterPlatform}
        />
    );
};

const YearSelection = ({ maps }: { maps: MinecraftMap[] }): ReactElement => {
    const { filteredYears, filterYears } = useMapsFilter();

    const minimumYear: number = Math.min(
        ...maps.map((map: MinecraftMap) => map.year)
    );
    const maximumYear: number =
        Math.max(...maps.map((map: MinecraftMap) => map.year)) + 5;

    return (
        <div className="pb-5 flex flex-col gap-1.5 text-sm">
            {/* Name */}
            <h1 className="font-bold">Release Year</h1>

            {/* Slider */}
            <DualRangeSlider
                label={(value) => (
                    <span className="text-xs font-bold">{value}</span>
                )}
                labelPosition="bottom"
                min={minimumYear}
                max={maximumYear}
                step={1}
                defaultValue={[minimumYear, maximumYear]}
                value={filteredYears}
                onValueChange={filterYears}
            />
        </div>
    );
};

const TagsSelection = ({ maps }: { maps: MinecraftMap[] }): ReactElement => {
    const { filteredTags, filterTags } = useMapsFilter();

    // Collect a list of every tag used by maps
    const allTags = new Set<string>();
    maps.forEach((map: MinecraftMap) => {
        map.tags.forEach((tag: string) => allTags.add(tag));
    });

    return (
        <div className="flex flex-col gap-1.5 text-sm">
            {/* Name */}
            <h1 className="font-bold">Tags ({filteredTags?.length || 0})</h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
                {[...allTags]
                    .sort((a, b) => {
                        const aFiltered = filteredTags?.includes(a) || false;
                        const bFiltered = filteredTags?.includes(b) || false;

                        // Filtered tags come first
                        if (aFiltered !== bFiltered) {
                            return bFiltered ? 1 : -1;
                        }

                        // Then sort alphabetically
                        return a.localeCompare(b);
                    })
                    .map((tag: string) => {
                        const filtered: boolean =
                            filteredTags?.includes(tag) || false;
                        return (
                            <Button
                                key={tag}
                                className="h-fit p-0"
                                variant="ghost"
                                onClick={() =>
                                    filterTags(
                                        filtered
                                            ? filteredTags?.filter(
                                                  (t) => t !== tag
                                              )
                                            : [...(filteredTags || []), tag]
                                    )
                                }
                            >
                                <Badge
                                    className={cn(filtered && "bg-primary/75")}
                                    variant={filtered ? "default" : "outline"}
                                >
                                    {tag}
                                </Badge>
                            </Button>
                        );
                    })}
            </div>
        </div>
    );
};

const ClearFilters = ({
    maps,
}: {
    maps: MinecraftMap[];
}): ReactElement | undefined => {
    const { filteredPlatform, filteredTags, filteredYears, clearFilters } =
        useMapsFilter();
    if (
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

export default MapsSidebar;
