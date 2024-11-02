import { ReactElement, Suspense } from "react";
import ServerList from "@/components/server/server-list";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
    title: "Browse Servers",
    description:
        "Browse through our collection of servers and start your next adventure today.",
};

const BrowseMapsPage = (): ReactElement => (
    <main className="mt-32 flex flex-col gap-7 items-center">
        {/* Header */}
        <div className="flex flex-col gap-1 text-center items-center">
            <h1 className="text-4xl xs:text-5xl font-bold text-primary">
                Browse Servers
            </h1>
            <p className="max-w-lg text-lg xs:text-xl opacity-75">
                Browse through our collection of servers and start your next
                adventure today.
            </p>
        </div>

        {/* Content */}
        <div className="flex flex-wrap flex-col sm:flex-row gap-4 justify-center items-center">
            <Suspense
                fallback={Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <Skeleton key={i} className="w-96 h-20 rounded-xl" />
                    ))}
            >
                <ServerList />
            </Suspense>
        </div>
    </main>
);
export default BrowseMapsPage;
