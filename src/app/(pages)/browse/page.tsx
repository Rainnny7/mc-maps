import { ReactElement } from "react";
import ServerList from "@/components/browse/server-list";

const BrowseMapsPage = (): ReactElement => (
    <main className="mt-40 flex flex-col gap-7 items-center">
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
        <ServerList />
    </main>
);
export default BrowseMapsPage;
