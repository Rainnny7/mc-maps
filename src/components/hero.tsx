import { ReactElement } from "react";
import Marquee from "@/components/ui/marquee";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { BiLogoGithub } from "react-icons/bi";
import { BsMap } from "react-icons/bs";

const Hero = (): ReactElement => (
    <section className="flex gap-5 justify-between">
        {/* Greeting */}
        <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold text-primary">MC Maps</h1>
            <h2 className="text-3xl font-bold opacity-95">
                Discover, download, and explore
            </h2>
            <p className="max-w-xl text-xl opacity-75">
                Your one-stop destination for finding and downloading Minecraft
                maps from your favorite servers. Browse through our collection
                and start your next adventure today.
            </p>

            {/* Buttons */}
            <div className="mt-3 flex gap-3 items-center">
                <Link href="/browse" draggable={false}>
                    <Button className="group bg-primary/85 gap-2 font-bold hover:opacity-75 transition-all transform-gpu">
                        <BsMap className="size-6" />
                        <span>Browse Maps</span>
                        <ChevronRight className="-ml-1 size-6 group-hover:translate-x-0.5 transition-all transform-gpu" />
                    </Button>
                </Link>
                <Link
                    href="https://github.com/Rainnny7/mc-maps"
                    draggable={false}
                >
                    <Button
                        className="bg-background/50"
                        variant="outline"
                        size="lg"
                    >
                        <BiLogoGithub className="size-5" />
                        <span>Source Code</span>
                    </Button>
                </Link>
            </div>
        </div>

        {/* Preview */}
        <Marquee className="hidden lg:flex max-w-md [--duration:3s]">
            <Skeleton className="w-72 h-52" />
        </Marquee>
    </section>
);
export default Hero;
