"use client";

import { ReactElement, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/actions/login";
import { isActionError, ServerActionResponse } from "@/types/error";
import { ArrowRightToLine, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

const AuthPage = (): ReactElement => {
    const router: AppRouterInstance = useRouter();

    const [loggingIn, setLoggingIn] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    return (
        <main className="h-full flex justify-center items-center">
            <form
                className="p-4 w-72 flex flex-col gap-1.5 items-center bg-background/75 border border-muted rounded-xl"
                action={async (form: FormData) => {
                    setLoggingIn(true);
                    const response: ServerActionResponse =
                        await loginAction(form);
                    const isError: boolean = isActionError(response);
                    setError(
                        isActionError(response) ? response.error : undefined
                    );
                    if (!isError) {
                        toast.success("Welcome back! Redirecting you...");
                        router.push("/admin");
                    }
                    setLoggingIn(false);
                }}
            >
                {/* Branding */}
                <Image
                    src="/media/logo.png"
                    alt="MC Maps Logo"
                    width={128}
                    height={128}
                    draggable={false}
                />

                {/* Password */}
                <div className="w-full relative">
                    <Input
                        className="pr-9"
                        name="password"
                        type="password"
                        placeholder="The magical key"
                    />
                    <div className="absolute inset-y-0 right-2.5 h-full pointer-events-none">
                        {loggingIn ? (
                            <LoaderCircle className="h-full size-4 animate-spin" />
                        ) : (
                            <ArrowRightToLine className="h-full size-4" />
                        )}
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <p className="self-start text-sm text-red-500">{error}</p>
                )}
            </form>
        </main>
    );
};
export default AuthPage;
