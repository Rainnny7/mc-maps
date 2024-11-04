"use server";

import { ServerActionResponse } from "@/types/error";
import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { MinecraftMap, MinecraftMapModel } from "@/models/map";
import { connectMongo } from "@/lib/mongo";

export const downloadMapAction = async (
    map: MinecraftMap
): Promise<ServerActionResponse> => {
    await connectMongo();
    await MinecraftMapModel.updateOne(
        { _id: map._id },
        { $inc: { downloads: 1 } }
    );
};
