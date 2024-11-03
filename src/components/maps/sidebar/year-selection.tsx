"use client";

import { MinecraftMap } from "@/models/map";
import { ReactElement } from "react";
import { useMapsFilter } from "@/providers/maps-filter-provider";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

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
export default YearSelection;
