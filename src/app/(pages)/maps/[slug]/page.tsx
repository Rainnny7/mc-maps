import { ReactElement } from "react";
import { connectMongo } from "@/lib/mongo";
import { MinecraftServerDocument, MinecraftServerModel } from "@/model/server";
import { notFound } from "next/navigation";

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
        <main className="mt-40 flex flex-col gap-7 items-center">
            {/* Header */}
            <div className="flex flex-col gap-1 text-center items-center">
                <h1 className="text-4xl xs:text-5xl font-bold text-primary">
                    {server.name} Maps
                </h1>
                <p className="max-w-lg text-lg xs:text-xl opacity-75">
                    Browse through our collection of maps for {server.name}.
                </p>
            </div>

            {/* Content */}
            <div>Maps (:</div>
        </main>
    );
};
export default MapsPage;
