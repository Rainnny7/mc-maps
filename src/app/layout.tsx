import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./style/globals.css";
import { ReactElement, ReactNode } from "react";
import Navbar from "@/components/navbar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: {
        default: "MC Maps",
        template: "%s • MC Maps",
    },
    description:
        "Discover, download, and explore Minecraft maps from your favorite servers! ",
    openGraph: {
        images: [
            {
                url: "https://maps.rainnny.club/media/logo.png",
                width: 128,
                height: 128,
            },
        ],
    },
    twitter: {
        card: "summary",
    },
};
export const viewport: Viewport = {
    themeColor: "#00AA00",
};

const RootLayout = async ({
    children,
}: Readonly<{
    children: ReactNode;
}>): Promise<ReactElement> => (
    <html lang="en" suppressHydrationWarning>
        <body
            className={`px-3 xs:px-5 w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-background via-[#1a1a1a] to-background ${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased select-none`}
        >
            <Navbar />
            <div className="w-full h-[calc(100vh-var(--navbar-height))] max-w-screen-xl">
                {children}
            </div>
        </body>
    </html>
);
export default RootLayout;
