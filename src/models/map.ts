import {
    getModelForClass,
    modelOptions,
    prop,
    ReturnModelType,
    Severity,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { type ServerPlatform } from "@/types/server-platform";
import { MinecraftServerDocument, MinecraftServerModel } from "@/models/server";
import { BucketItem } from "minio";
import { s3Client } from "@/lib/minio";

@modelOptions({
    options: { customName: "MinecraftMap", allowMixed: Severity.ALLOW },
    schemaOptions: { collection: "maps" },
})
class MinecraftMapInternal {
    /**
     * The ID of this map.
     */
    @prop()
    public _id!: string;

    /**
     * The name of this map.
     */
    @prop()
    public name!: string;

    /**
     * The optional description of this map.
     */
    @prop()
    public description?: string | undefined;

    /**
     * The platform this map is for.
     */
    @prop()
    public platform!: ServerPlatform;

    /**
     * The tags of this map.
     */
    @prop()
    public tags!: string[];

    /**
     * The year this map was released on the server its owned by.
     */
    @prop()
    public year!: number;

    /**
     * The amount of times this map has been downloaded.
     */
    @prop()
    public downloads!: number;

    /**
     * The name of the uploader.
     */
    @prop()
    public uploadedBy!: string;

    /**
     * The date this map was uploaded.
     */
    @prop()
    public uploadedAt: Date = new Date();

    /**
     * The size (in bytes) of this map.
     */
    @prop()
    public size!: number;

    /**
     * The ID of the {@link MinecraftServerDocument} that owns this map.
     */
    @prop({ ref: MinecraftServerModel })
    public owner!: string;

    /**
     * Get the URL to download this map.
     *
     * @param server the server the map belongs to
     */
    public getDownloadUrl(
        this: MinecraftMapDocument,
        server: MinecraftServerDocument
    ): string {
        return `https://s3.rainnny.club/mcmap-maps/${server._id}/${this._id}/map.zip`;
    }

    public async getPreviews(
        this: MinecraftMapDocument,
        server: MinecraftServerDocument
    ): Promise<BucketItem[]> {
        return new Promise<BucketItem[]>((resolve, reject) => {
            const items: BucketItem[] = [];

            const previewsStream = s3Client.listObjectsV2(
                "mcmap-maps",
                `${server._id}/${this._id}/previews/`,
                false
            );
            previewsStream.on("data", (item: BucketItem) => items.push(item));
            previewsStream.on("end", () => resolve(items));
            previewsStream.on("error", (err: Error) => reject(err));
        });
    }
}

export type MinecraftMapDocument = MinecraftMapInternal & mongoose.Document;
export const MinecraftMapModel: ReturnModelType<typeof MinecraftMapInternal> =
    (mongoose.models.MinecraftMap as any) ||
    getModelForClass(MinecraftMapInternal);
export type MinecraftMap = InstanceType<typeof MinecraftMapInternal>;
