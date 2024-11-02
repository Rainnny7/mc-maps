import { MinecraftServerDocument } from "@/models/server";
import { MinecraftMapDocument } from "@/models/map";

/**
 * Get the logo of a Minecraft server.
 *
 * @param server the server
 */
export const getServerLogo = (server: MinecraftServerDocument) =>
    `https://s3.rainnny.club/mcmap-servers/${server.id}/logo.png`;

/**
 * Get the banner art of a Minecraft server.
 *
 * @param server the server
 */
export const getServerBanner = (server: MinecraftServerDocument) =>
    `https://s3.rainnny.club/mcmap-servers/${server.id}/banner.png`;

/**
 * Get the download URL of a Minecraft map.
 *
 * @param server the server the map belongs to
 * @param map the map
 */
export const getMapDownloadUrl = (
    server: MinecraftServerDocument,
    map: MinecraftMapDocument
) => `https://s3.rainnny.club/mcmap-maps/${server.id}/${map.id}/map.zip`;
