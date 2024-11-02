import { ReactElement } from "react";
import { s3Client } from "@/lib/minio";
import { BucketItem, BucketStream } from "minio";

const MapPreviewCarousel = async (): Promise<ReactElement> => {
    const previews: BucketStream<BucketItem> = s3Client.listObjectsV2(
        "mcmap-maps",
        "previews",
        true
    );

    // previews.on("data", function (obj) {
    //     console.log("sdfds", obj);
    // });
    // previews.on("error", function (err) {
    //     console.log(err);
    // });

    return <div>sdfs</div>;
};
export default MapPreviewCarousel;
