"use client";

import { ReactElement } from "react";
import { MinecraftMap } from "@/models/map";
import Link from "next/link";
import Image from "next/image";
import { ServerPlatform } from "@/types/server-platform";
import SimpleTooltip from "@/components/simple-tooltip";
import { capitalize } from "@/lib/string";
import { MinecraftServer } from "@/models/server";
import { useMapsFilter } from "@/providers/maps-filter-provider";
import { DateTime } from "luxon";

const MapList = ({
    server,
    maps,
}: {
    server: MinecraftServer;
    maps: MinecraftMap[];
}): ReactElement => {
    const { filteredPlatform, filteredTags, filteredYears } = useMapsFilter();

    // Filter the maps based on the user's filters
    maps = maps.filter((map: MinecraftMap) => {
        const platformMatch =
            !filteredPlatform || map.platform === filteredPlatform;
        const tagsMatch =
            !filteredTags ||
            filteredTags.every((tag: string) => map.tags.includes(tag));
        const yearsMatch =
            !filteredYears ||
            (map.year >= filteredYears[0] && map.year <= filteredYears[1]);
        return platformMatch && tagsMatch && yearsMatch;
    });

    return maps.length < 1 ? (
        <span className="text-lg text-red-500">
            No maps found with your filters ):
        </span>
    ) : (
        // Maps
        <div className="flex gap-3 items-center">
            {maps.map((map: MinecraftMap) => (
                <SimpleTooltip key={map._id} content="Click to view">
                    <Link
                        className="group relative h-48 border border-muted rounded-xl overflow-hidden"
                        href={`/map/${server._id}/${map._id}`}
                        draggable={false}
                    >
                        {/* Thumbnail */}
                        <Image
                            className="rounded-xl group-hover:scale-[1.02] transition-all transform-gpu"
                            src={`https://s3.rainnny.club/mcmap-maps/${server._id}/${map._id}/previews/1.png`}
                            alt={`Thumbnail for the map ${map.name}`}
                            width={360}
                            height={360}
                            draggable={false}
                        />

                        {/* Info */}
                        <div className="absolute inset-x-0 -bottom-1 px-2.5 py-1 pb-2 group-hover:py-2 group-hover:pb-3 flex flex-col bg-zinc-900/90 rounded-b-xl transition-all transform-gpu">
                            {/* Platform & Name */}
                            <h1 className="flex gap-1.5 items-center font-semibold text-primary">
                                <SimpleTooltip
                                    content={`${capitalize(map.platform)} Edition`}
                                >
                                    <Image
                                        src={`/media/blocks/${map.platform === ServerPlatform.Java ? "grass" : "bedrock"}.png`}
                                        alt="sdfs"
                                        width={20}
                                        height={20}
                                    />
                                </SimpleTooltip>
                                <span>{map.name}</span>
                            </h1>

                            {/* Uploader & Stats */}
                            <div className="flex justify-between items-center">
                                {/* Uploader */}
                                <p className="flex gap-1.5 items-center text-sm">
                                    <span className="font-semibold">
                                        {map.uploadedBy}
                                    </span>
                                    🞄
                                    <span>
                                        {DateTime.fromISO(
                                            map.uploadedAt.toISOString()
                                        ).toRelative()}
                                    </span>
                                </p>

                                {/* Stats */}
                                <div className="flex gap-3 items-center justify-end text-sm opacity-65">
                                    <span>0 Downloads</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </SimpleTooltip>
            ))}
        </div>
    );
};
export default MapList;
