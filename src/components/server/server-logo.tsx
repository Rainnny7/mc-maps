import { MinecraftServerDocument } from "@/models/server";
import Image from "next/image";

const ServerLogo = ({ server }: { server: MinecraftServerDocument }) => (
    <Image
        src={server.getLogo()}
        alt={`Logo for ${server.name}`}
        width={48}
        height={48}
        draggable={false}
    />
);
export default ServerLogo;
