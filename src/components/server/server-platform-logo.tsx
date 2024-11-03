import { ReactElement } from "react";
import { ServerPlatform } from "@/types/server-platform";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ServerPlatformLogoProps = {
    className?: string | undefined;
    platform: ServerPlatform;
};

const ServerPlatformLogo = ({
    className,
    platform,
}: ServerPlatformLogoProps): ReactElement => (
    <Image
        className={cn(className)}
        src={`/media/blocks/${platform === ServerPlatform.Java ? "grass" : "bedrock"}.png`}
        alt={`Platform logo for ${platform}`}
        width={20}
        height={20}
        draggable={false}
    />
);
export default ServerPlatformLogo;
