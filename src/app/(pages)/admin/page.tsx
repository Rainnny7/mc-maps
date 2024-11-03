import { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { BsMap } from "react-icons/bs";

const AdminPage = (): ReactElement => (
    <main className="mt-20 h-full flex flex-col gap-24 items-center">
        {/* Header */}
        <h1 className="text-4xl xs:text-5xl font-bold text-primary">
            Administration
        </h1>

        {/* Links */}
        <div className="flex bg-red-500">
            <QuickLink
                name="Maps"
                icon={<BsMap className="size-6" />}
                href="/admin/maps"
            />
        </div>
    </main>
);

const QuickLink = ({
    name,
    icon,
    href,
}: {
    name: string;
    icon: ReactNode;
    href: string;
}): ReactElement => (
    <Link href={href} draggable={false}>
        {name}
    </Link>
);

export default AdminPage;
