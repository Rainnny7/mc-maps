import { connectMongo } from "@/lib/mongo";
import { MinecraftServerDocument, MinecraftServerModel } from "@/models/server";
import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import ServerLogo from "@/components/server/server-logo";

const ServerList = async (): Promise<ReactElement> => {
    await connectMongo();
    const servers: MinecraftServerDocument[] | null =
        await MinecraftServerModel.find({});
    return (
        <>
            {servers.map((server: MinecraftServerDocument) => (
                <Link
                    key={server._id}
                    className="group relative h-20 rounded-xl border border-muted/30 hover:opacity-75 transition-all transform-gpu overflow-hidden"
                    href={`/maps/${server._id}`}
                    draggable={false}
                >
                    <Image
                        src={server.getBanner()}
                        className="rounded-xl blur-[1px] border border-muted opacity-50 group-hover:scale-[1.02] transition-all transform-gpu"
                        alt={`Banner art for ${server.name}`}
                        width={332}
                        height={332}
                        draggable={false}
                    />
                    <div className="absolute left-3.5 inset-y-0 flex gap-2.5 items-center group-hover:scale-[1.02]">
                        <ServerLogo server={server} />
                        <h1 className="text-2xl font-bold">{server.name}</h1>
                    </div>
                </Link>
            ))}
        </>
    );
};
export default ServerList;
