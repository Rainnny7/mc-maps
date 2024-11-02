import { ReactElement } from "react";
import { BucketItem } from "minio";
import { MinecraftServerDocument } from "@/models/server";
import { MinecraftMapDocument } from "@/models/map";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const MapPreviewCarousel = async ({
    server,
    map,
}: {
    server: MinecraftServerDocument;
    map: MinecraftMapDocument;
}): Promise<ReactElement> => {
    const previews: BucketItem[] = await map.getPreviews(server);

    return previews.length < 1 ? (
        <span className="text-xl text-red-500">
            This map has no previews ):
        </span>
    ) : (
        <Carousel
            className="px-12 max-w-screen-md"
            opts={{
                align: "center",
                loop: true,
            }}
        >
            <CarouselContent>
                {previews.map((preview) => (
                    <CarouselItem key={preview.name}>
                        <Image
                            className="rounded-xl"
                            src={`https://s3.rainnny.club/mcmap-maps/${preview.name}`}
                            alt={`Map preview of ${map.name}`}
                            width={1280}
                            height={720}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};
export default MapPreviewCarousel;
