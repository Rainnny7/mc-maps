import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {cookies} from "next/headers";

/**
 * Check if the user is authenticated.
 */
export const useIsAuthed = async (): Promise<boolean> => {
    const cookieStore: ReadonlyRequestCookies = await cookies();
    const session: string | undefined =
        cookieStore.get("mc-maps-session")?.value;
    return (
        session !== undefined && atob(session) === process.env.ADMIN_PASSWORD
    );
};
