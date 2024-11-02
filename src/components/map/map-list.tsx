import { ReactElement } from "react";
import { MinecraftMapDocument, MinecraftMapModel } from "@/models/map";
import { MinecraftServerDocument } from "@/models/server";
import Link from "next/link";
import Image from "next/image";
import { ServerPlatform } from "@/types/server-platform";
import SimpleTooltip from "@/components/simple-tooltip";
import { capitalize } from "@/lib/string";

const MapList = async ({
    server,
}: {
    server: MinecraftServerDocument;
}): Promise<ReactElement> => {
    const maps: MinecraftMapDocument[] | null = await MinecraftMapModel.find({
        owner: server.id,
    });
    return maps?.length < 1 ? (
        <span className="text-xl text-red-500">This server has no maps ):</span>
    ) : (
        // Maps
        <div className="flex gap-3 items-center">
            {maps.map((map: MinecraftMapDocument) => (
                <SimpleTooltip key={map.id} content="Click to view">
                    <Link
                        className="group relative border border-muted rounded-xl overflow-hidden"
                        href={`/map/${server.id}/${map.id}`}
                        draggable={false}
                    >
                        {/* Thumbnail */}
                        <Image
                            className="rounded-xl group-hover:scale-[1.02] transition-all transform-gpu"
                            src={`https://s3.rainnny.club/mcmap-maps/${server.id}/${map.id}/previews/1.png`}
                            alt={`Thumbnail for the map ${map.name}`}
                            width={332}
                            height={332}
                            draggable={false}
                        />

                        {/* Info */}
                        <div className="absolute inset-x-0 -bottom-1 px-2.5 py-1 pb-2 group-hover:py-2 group-hover:pb-3 flex justify-between bg-zinc-900/90 rounded-b-xl transition-all transform-gpu">
                            {/* Platform & Name */}
                            <div className="flex gap-2 items-center">
                                <SimpleTooltip
                                    content={`${capitalize(map.platform)} Edition Map`}
                                >
                                    <Image
                                        src={`/media/blocks/${map.platform === ServerPlatform.Java ? "grass" : "bedrock"}.png`}
                                        alt="sdfs"
                                        width={20}
                                        height={20}
                                    />
                                </SimpleTooltip>
                                <h1 className="text-sm font-semibold">
                                    {map.name}
                                </h1>
                            </div>
                        </div>
                    </Link>
                </SimpleTooltip>
            ))}
        </div>
    );
};
export default MapList;
