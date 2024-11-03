import { MinecraftServerDocument } from "@/models/server";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ServerLogoProps = {
    /**
     * The server to display the logo for.
     */
    server: MinecraftServerDocument;

    /**
     * The optional class name to apply to the logo.
     */
    className?: string | undefined;
};

const ServerLogo = ({ server, className }: ServerLogoProps) => (
    <Image
        className={cn(className)}
        src={server.getLogo()}
        alt={`Logo for ${server.name}`}
        width={48}
        height={48}
        draggable={false}
    />
);
export default ServerLogo;
