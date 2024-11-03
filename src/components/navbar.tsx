"use client";

import { ReactElement } from "react";
import Link from "next/link";
import { ExternalLink, Shield } from "lucide-react";
import { BiLogoDiscordAlt, BiLogoGithub } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Branding from "@/components/branding";

const links = [
    {
        name: "Browse",
        href: "/browse",
    },
    {
        name: "Contribute",
        href: "https://github.com/Rainnny7/mc-maps",
    },
];

const socialLinks = [
    {
        name: "GitHub",
        icon: <BiLogoGithub className="size-6" />,
        href: "https://github.com/Rainnny7/mc-maps",
    },
    {
        name: "Discord",
        icon: <BiLogoDiscordAlt className="size-6" />,
        href: "https://discord.gg/7aGP649ARz",
    },
];

const Navbar = ({
    isAuthed,
}: {
    isAuthed: boolean;
}): ReactElement | undefined => {
    const path: string = usePathname();
    if (path.startsWith("/admin")) {
        return undefined;
    }
    return (
        <nav className="sticky inset-x-0 top-0 w-full h-[var(--navbar-height)] py-1.5 flex justify-center items-center">
            <div className="w-full max-w-screen-2xl flex justify-between items-center">
                {/* Left */}
                <div className="flex gap-3 sm:gap-7 items-center">
                    {/* Branding */}
                    <Branding />

                    {/* Links */}
                    <div className="flex gap-4 sm:gap-7 items-center transition-all transform-gpu">
                        {links.map((link) => {
                            const external: boolean =
                                link.href.startsWith("http");
                            return (
                                <Link
                                    key={link.name}
                                    className="flex gap-1.5 items-center text-sm font-semibold hover:text-[#55FF55]/75 transition-all transform-gpu"
                                    href={link.href}
                                    draggable={false}
                                    target={external ? "_blank" : "_self"}
                                >
                                    {link.name}
                                    {external && (
                                        <ExternalLink className="size-3.5" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Right */}
                <div className="flex gap-2 items-center divide-x divide-muted">
                    {/* Socials */}
                    <div className="flex gap-2 items-center">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.name}
                                className="opacity-75 hover:opacity-100 transition-all transform-gpu"
                                href={link.href}
                                target="_blank"
                                draggable={false}
                            >
                                {link.icon}
                            </Link>
                        ))}
                    </div>

                    {isAuthed && (
                        <Link href="/admin" draggable={false}>
                            <Shield className="pl-2 size-7 opacity-75 hover:opacity-100 transition-all transform-gpu" />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
