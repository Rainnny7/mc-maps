"use client";

import { MinecraftMap } from "@/models/map";
import { ReactElement } from "react";
import { useMapsFilter } from "@/providers/maps-filter-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
export default TagsSelection;
