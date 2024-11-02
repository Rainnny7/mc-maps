import { BucketItem, Client } from "minio";
import { MinecraftMapDocument } from "@/models/map";
import { MinecraftServerDocument } from "@/models/server";

const S3_ENDPOINT: string | undefined = process.env.S3_ENDPOINT;
const S3_ACCESS_KEY: string | undefined = process.env.S3_ACCESS_KEY;
const S3_SECRET_KEY: string | undefined = process.env.S3_SECRET_KEY;
if (!S3_ENDPOINT || !S3_ACCESS_KEY || !S3_SECRET_KEY) {
    throw new Error(
        "Please define the S3_ENDPOINT, S3_ACCESS_KEY, and S3_SECRET_KEY environment variables inside your .env"
    );
}

export const s3Client = new Client({
    endPoint: S3_ENDPOINT,
    port: process.env.S3_PORT ? Number(process.env.S3_PORT) : undefined,
    accessKey: S3_ACCESS_KEY,
    secretKey: S3_SECRET_KEY,
    useSSL: process.env.S3_USE_SSL !== "true",
});

/**
 * Get the preview images for a map.
 *
 * @param server the server the map belongs to
 * @param map the map
 */
export const getMapPreviews = async (
    server: MinecraftServerDocument,
    map: MinecraftMapDocument
): Promise<BucketItem[]> =>
    new Promise<BucketItem[]>((resolve, reject) => {
        const items: BucketItem[] = [];

        const previewsStream = s3Client.listObjectsV2(
            "mcmap-maps",
            `${server.id}/${map.id}/previews/`,
            false
        );
        previewsStream.on("data", (item: BucketItem) => items.push(item));
        previewsStream.on("end", () => resolve(items));
        previewsStream.on("error", (err: Error) => reject(err));
    });