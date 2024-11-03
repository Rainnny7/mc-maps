"use server";

import { ServerActionResponse } from "@/types/error";
import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const loginAction = async (
    form: FormData
): Promise<ServerActionResponse> => {
    const password: FormDataEntryValue | null = form.get("password");
    if (!password || (password as string) !== process.env.ADMIN_PASSWORD) {
        return { error: "You must not know the magic key ):" };
    }
    const cookieStore: ReadonlyRequestCookies = await cookies();
    cookieStore.set("mc-maps-session", btoa(password as string), {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
    });
};
