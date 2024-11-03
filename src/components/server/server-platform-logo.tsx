import { ReactElement } from "react";
import { ServerPlatform } from "@/types/server-platform";
import Image from "next/image";

const ServerPlatformLogo = ({
    platform,
}: {
    platform: ServerPlatform;
}): ReactElement => (
    <Image
        src={`/media/blocks/${platform === ServerPlatform.Java ? "grass" : "bedrock"}.png`}
        alt="sdfs"
        width={20}
        height={20}
    />
);
export default ServerPlatformLogo;
