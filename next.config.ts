import { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3.rainnny.club",
            },
        ],
    },
    experimental: {
        serverMinification: false,
    },
};
export default nextConfig;
