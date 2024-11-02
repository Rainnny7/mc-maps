import { MinecraftServerDocument } from "@/model/server";
import { getServerLogo } from "@/lib/media";
import Image from "next/image";

const ServerLogo = ({ server }: { server: MinecraftServerDocument }) => (
    <Image
        src={getServerLogo(server)}
        alt={`Logo for ${server.name}`}
        width={48}
        height={48}
    />
);
export default ServerLogo;
