"use client";

import { ReactElement } from "react";
import { MinecraftMap } from "@/models/map";
import SearchBar from "@/components/maps/sidebar/search-bar";
import PlatformSelection from "@/components/maps/sidebar/platform-selection";
import { Separator } from "@/components/ui/separator";
import YearSelection from "@/components/maps/sidebar/year-selection";
import TagsSelection from "@/components/maps/sidebar/tags-selection";
import ClearFilters from "@/components/maps/sidebar/clear-filters";

const MapsSidebar = ({ maps }: { maps: MinecraftMap[] }): ReactElement => (
    <div className="hidden sm:flex sticky min-h-52 h-[100vh] max-h-[calc(100vh-40rem)] min-w-32 w-48 lg:w-60 p-2.5 lg:p-3.5 flex-col gap-3 rounded-xl bg-background/75 border border-muted transition-all transform-gpu overflow-y-auto">
        <SearchBar />
        <Separator className="my-0.5" />
        <PlatformSelection />
        <YearSelection maps={maps} />
        <TagsSelection maps={maps} />
        <ClearFilters />
    </div>
);
export default MapsSidebar;
