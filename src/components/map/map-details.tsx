"use client";

import { ReactElement, useState } from "react";
import SimpleTooltip from "@/components/simple-tooltip";
import { capitalize } from "@/lib/string";
import ServerPlatformLogo from "@/components/server/server-platform-logo";
import MapDownloadButton from "@/components/map/map-download-button";
import MapStats from "@/components/map/map-stats";
import { MinecraftServer } from "@/models/server";
import { MinecraftMap } from "@/models/map";

const MapDetails = ({
    server,
    map,
}: {
    server: MinecraftServer;
    map: MinecraftMap;
}): ReactElement => {
    const [downloads, setDownloads] = useState<number>(map.downloads);
    const incrementDownloads = () => setDownloads(downloads + 1);

    return (
        <div className="px-14 flex flex-col gap-3 sm:flex-row justify-between items-center">
            {/* Platform & Download */}
            <div className="flex gap-4 items-center">
                {/* Platform */}
                <SimpleTooltip content={`${capitalize(map.platform)} Edition`}>
                    <ServerPlatformLogo
                        className="size-7"
                        platform={map.platform}
                    />
                </SimpleTooltip>

                {/* Download */}
                <MapDownloadButton
                    className="bg-primary/75"
                    server={server}
                    map={map}
                    incrementDownloads={incrementDownloads}
                />
            </div>

            {/* Stats */}
            <MapStats
                className="text-base"
                map={map}
                downloads={downloads}
                fullStats
            />
        </div>
    );
};
export default MapDetails;
