import {
    getModelForClass,
    modelOptions,
    prop,
    ReturnModelType,
    Severity,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({
    options: { customName: "MinecraftServer", allowMixed: Severity.ALLOW },
    schemaOptions: { collection: "servers" },
})
class MinecraftServerInternal {
    @prop()
    public _id!: string;

    @prop()
    public name!: string;

    @prop()
    public socials?: {
        [key: string]: string;
    };

    /**
     * Get the logo of this server.
     */
    public getLogo(this: MinecraftServerDocument): string {
        return `https://s3.rainnny.club/mcmap-servers/${this._id}/logo.png`;
    }

    /**
     * Get the banner art of this server.
     */
    public getBanner(this: MinecraftServerDocument): string {
        return `https://s3.rainnny.club/mcmap-servers/${this._id}/banner.png`;
    }
}

export type MinecraftServerDocument = MinecraftServerInternal &
    mongoose.Document;
export const MinecraftServerModel: ReturnModelType<
    typeof MinecraftServerInternal
> =
    (mongoose.models.MinecraftServer as any) ||
    getModelForClass(MinecraftServerInternal);
export type MinecraftServer = InstanceType<typeof MinecraftServerInternal>;
