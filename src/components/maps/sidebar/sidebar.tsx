"use client";

import { ReactElement, useEffect, useState } from "react";
import { MinecraftMap } from "@/models/map";
import SearchBar from "@/components/maps/sidebar/search-bar";
import PlatformSelection from "@/components/maps/sidebar/platform-selection";
import { Separator } from "@/components/ui/separator";
import YearSelection from "@/components/maps/sidebar/year-selection";
import TagsSelection from "@/components/maps/sidebar/tags-selection";
import ClearFilters from "@/components/maps/sidebar/clear-filters";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useIsScreenSize } from "@/hooks/screen-size";
import { ScreenSize } from "@/types/screen-size";
import { PanelRight } from "lucide-react";

const MapsSidebar = ({ maps }: { maps: MinecraftMap[] }): ReactElement => {
    const [isMobileDisplayed, setIsMobileDisplayed] = useState<boolean>(false);
    const displayOnDesktop = useIsScreenSize({ size: ScreenSize.sm });

    useEffect(() => {
        if (isMobileDisplayed && displayOnDesktop) {
            setIsMobileDisplayed(false);
        }
    }, [isMobileDisplayed, displayOnDesktop]);

    return (
        <>
            {/* Desktop */}
            <div className="hidden sm:flex sticky min-h-80 h-[100vh] max-h-[calc(100vh-37rem)]">
                <SidebarContent maps={maps} />
            </div>

            {/* Mobile */}
            <div className="sm:hidden">
                <Sheet
                    open={isMobileDisplayed}
                    onOpenChange={setIsMobileDisplayed}
                >
                    <SheetTrigger className="absolute top-0 right-0">
                        <PanelRight className="size-5 opacity-65 hover:opacity-90 transition-all transform-gpu" />
                    </SheetTrigger>
                    <SheetContent className="p-2 pt-10 w-full max-w-72">
                        <SheetHeader>
                            <SheetTitle className="hidden" />
                        </SheetHeader>
                        <SidebarContent maps={maps} />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
};

const SidebarContent = ({ maps }: { maps: MinecraftMap[] }) => (
    <div className="w-full h-full sm:w-48 lg:w-60 p-2.5 lg:p-3.5 flex flex-col gap-2.5 rounded-xl bg-background/75 sm:border border-muted transition-all transform-gpu overflow-y-auto">
        <SearchBar />
        <Separator className="my-0.5" />
        <PlatformSelection />
        <YearSelection maps={maps} />
        <TagsSelection maps={maps} />
        <ClearFilters />
    </div>
);

export default MapsSidebar;
