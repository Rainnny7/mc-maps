import { ReactElement } from "react";
import { cn } from "@/lib/utils";
import { MinecraftMap } from "@/models/map";
import { formatFileSize } from "@/lib/io";

type MapStatsProps = {
    className?: string | undefined;
    map: MinecraftMap;
    fullStats?: boolean;
};

const MapStats = ({
    map,
    className,
    fullStats,
}: MapStatsProps): ReactElement => {
    const mapSize: string = formatFileSize(map.size);
    return (
        <div
            className={cn(
                "flex gap-5 items-center justify-end text-sm opacity-65",
                className
            )}
        >
            {fullStats && <span>{mapSize}</span>}
            <span>
                {new Intl.NumberFormat().format(map.downloads)} Downloads
            </span>
        </div>
    );
};
export default MapStats;
