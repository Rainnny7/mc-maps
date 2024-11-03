import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandingProps = {
    className?: string | undefined;
};

const Branding = ({ className }: BrandingProps): ReactElement => (
    <Link
        className={cn(
            "flex gap-3 items-center text-xl hover:opacity-75 transition-all transform-gpu",
            className
        )}
        href="/"
        draggable={false}
    >
        <Image
            className="truncate"
            src="/media/logo.png"
            alt="MC Maps Logo"
            width={42}
            height={42}
            draggable={false}
        />
        <h1 className="truncate hidden sm:flex font-bold text-primary">
            MC Maps
        </h1>
    </Link>
);
export default Branding;
