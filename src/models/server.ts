import {
    getModelForClass,
    modelOptions,
    prop,
    ReturnModelType,
    Severity,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({
    schemaOptions: { collection: "servers" },
    options: { allowMixed: Severity.ALLOW },
})
class MinecraftServer {
    @prop()
    private _id!: string;

    @prop()
    public name!: string;

    @prop()
    public socials?: {
        [key: string]: string;
    };

    get id(): string {
        return this._id;
    }
}

export type MinecraftServerDocument = MinecraftServer & Document;
export const MinecraftServerModel: ReturnModelType<typeof MinecraftServer> =
    (mongoose.models.MinecraftServer as any) ||
    getModelForClass(MinecraftServer);
