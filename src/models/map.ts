import {
    getModelForClass,
    modelOptions,
    prop,
    ReturnModelType,
    Severity,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { type ServerPlatform } from "@/types/server-platform";

@modelOptions({
    schemaOptions: { collection: "maps" },
    options: { allowMixed: Severity.ALLOW },
})
class MinecraftMap {
    @prop()
    private _id!: string;

    @prop()
    public name!: string;

    @prop()
    public description?: string | undefined;

    @prop()
    public platform!: ServerPlatform;

    @prop()
    public tags!: string[];

    @prop()
    public year!: number;

    /**
     * The ID of the {@link MinecraftServerDocument} that owns this map.
     */
    @prop()
    public owner!: string;

    @prop()
    public uploadedBy!: string;

    @prop()
    public uploadedAt: Date = new Date();

    get id(): string {
        return this._id;
    }
}

export type MinecraftMapDocument = MinecraftMap & Document;
export const MinecraftMapModel: ReturnModelType<typeof MinecraftMap> =
    (mongoose.models.MinecraftMap as any) || getModelForClass(MinecraftMap);
