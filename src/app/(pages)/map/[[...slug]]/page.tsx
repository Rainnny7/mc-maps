import { ReactElement } from "react";
import { connectMongo } from "@/lib/mongo";
import { MinecraftServerDocument, MinecraftServerModel } from "@/models/server";
import { notFound } from "next/navigation";
import { MinecraftMapDocument, MinecraftMapModel } from "@/models/map";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import MapPreviewCarousel from "@/components/map/map-preview-carousel";
import { DateTime } from "luxon";

const MapPage = async ({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}): Promise<ReactElement> => {
    const slug = (await params).slug;
    if (slug.length !== 2) {
        notFound();
    }
    await connectMongo();
    const server: MinecraftServerDocument | null =
        await MinecraftServerModel.findOne({ _id: slug[0] });
    let map: MinecraftMapDocument | null;
    if (
        !server ||
        !(map = await MinecraftMapModel.findOne({
            _id: slug[1],
            owner: server.id,
        }))
    ) {
        notFound();
    }

    return (
        <main className="mt-20 flex flex-col gap-7 items-center">
            {/* Header */}
            <div className="flex flex-col gap-1 text-center items-center">
                {/* Go Back */}
                <Link
                    className="group self-start pb-5 flex gap-0.5 items-center opacity-65 hover:opacity-90 transition-all transform-gpu"
                    href="/browse"
                    draggable={false}
                >
                    <ChevronLeft className="size-5 group-hover:-translate-x-0.5 transition-all transform-gpu" />
                    <span>Back to Maps</span>
                </Link>

                <h1 className="text-4xl md:text-5xl flex gap-4 items-center font-bold text-primary">
                    {map.name}
                </h1>
                <p className="max-w-2xl text-lg md:text-xl opacity-75">
                    {map.description}
                </p>

                {/* Uploader */}
                <span className="opacity-75">
                    Uploaded by {map.uploadedBy} -{" "}
                    {DateTime.fromISO(
                        map.uploadedAt.toISOString()
                    ).toRelative()}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-col">
                <MapPreviewCarousel server={server} map={map} />
            </div>
        </main>
    );
};
export default MapPage;
