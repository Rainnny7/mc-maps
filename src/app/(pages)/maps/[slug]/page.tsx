import { ReactElement } from "react";
import { connectMongo } from "@/lib/mongo";
import { MinecraftServerDocument, MinecraftServerModel } from "@/models/server";
import { notFound } from "next/navigation";
import ServerLogo from "@/components/server/server-logo";
import MapList from "@/components/map/map-list";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const MapsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<ReactElement> => {
    const slug = (await params).slug;
    await connectMongo();
    const server: MinecraftServerDocument | null =
        await MinecraftServerModel.findOne({ _id: slug });
    if (!server) {
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
                    <span>Back to Servers</span>
                </Link>

                <h1 className="text-4xl xs:text-5xl flex gap-4 items-center font-bold text-primary">
                    <ServerLogo server={server} />
                    <span>{server.name} Maps</span>
                </h1>
                <p className="max-w-lg text-lg xs:text-xl opacity-75">
                    Browse through our collection of maps for {server.name}.
                </p>
            </div>

            {/* Content */}
            <MapList server={server} />
        </main>
    );
};
export default MapsPage;
