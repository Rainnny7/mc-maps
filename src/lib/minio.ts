import { Client } from "minio";

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
    useSSL: process.env.S3_USE_SSL !== "false",
});
