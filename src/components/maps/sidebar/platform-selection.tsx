"use client";

import { ReactElement } from "react";
import { useMapsFilter } from "@/providers/maps-filter-provider";
import Combobox from "@/components/combobox";
import { ServerPlatform } from "@/types/server-platform";
import ServerPlatformLogo from "@/components/server/server-platform-logo";

const PlatformSelection = (): ReactElement => {
    const { filteredPlatform, filterPlatform } = useMapsFilter();
    return (
        <Combobox<ServerPlatform>
            name="Server Platform"
            placeholder="Filter by platform"
            items={[
                {
                    value: ServerPlatform.Java,
                    name: (
                        <>
                            <ServerPlatformLogo
                                platform={ServerPlatform.Java}
                            />
                            <span>Java Edition</span>
                        </>
                    ),
                },
                {
                    value: ServerPlatform.Bedrock,
                    name: (
                        <>
                            <ServerPlatformLogo
                                platform={ServerPlatform.Bedrock}
                            />
                            <span>Bedrock Edition</span>
                        </>
                    ),
                },
            ]}
            value={filteredPlatform}
            onValueChange={filterPlatform}
        />
    );
};
export default PlatformSelection;
