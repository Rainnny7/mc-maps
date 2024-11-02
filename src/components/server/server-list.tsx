import { connectMongo } from "@/lib/mongo";
import { MinecraftServerDocument, MinecraftServerModel } from "@/models/server";
import { ReactElement } from "react";
import Image from "next/image";
import { getServerBanner } from "@/lib/media";
import Link from "next/link";
import ServerLogo from "@/components/server/server-logo";

const ServerList = async (): Promise<ReactElement> => {
    await connectMongo();
    const servers: MinecraftServerDocument[] | null =
        await MinecraftServerModel.find({});
    return (
        <>
            {servers.map((server: MinecraftServerDocument) => {
                return (
                    <Link
                        key={server.id}
                        className="group relative rounded-xl hover:opacity-75 transition-all transform-gpu overflow-hidden"
                        href={`/maps/${server.id}`}
                        draggable={false}
                    >
                        <Image
                            src={getServerBanner(server)}
                            className="rounded-xl blur-[1px] border border-muted opacity-50 group-hover:scale-[1.02] transition-all transform-gpu"
                            alt={`Banner art for ${server.name}`}
                            width={332}
                            height={332}
                            draggable={false}
                        />
                        <div className="absolute left-3.5 inset-y-0 flex gap-2.5 items-center group-hover:scale-[1.02]">
                            <ServerLogo server={server} />
                            <h1 className="text-2xl font-bold">
                                {server.name}
                            </h1>
                        </div>
                    </Link>
                );
            })}
        </>
    );
};
export default ServerList;