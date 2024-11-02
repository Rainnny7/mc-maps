import { MinecraftServerDocument } from "@/model/server";

export const getServerLogo = (server: MinecraftServerDocument) => {
    return `https://s3.rainnny.club/mcmap-servers/${server.id}/logo.png`;
};

export const getServerBanner = (server: MinecraftServerDocument) => {
    return `https://s3.rainnny.club/mcmap-servers/${server.id}/banner.png`;
};
