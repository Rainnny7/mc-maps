"use client";

import { ComponentPropsWithoutRef, ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileCheck2, LoaderCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MinecraftMap } from "@/models/map";
import { downloadMapAction } from "@/actions/download";
import { MinecraftServer } from "@/models/server";

type MapDownloadButtonProps = ComponentPropsWithoutRef<typeof Button> & {
    /**
     * The server that owns the map.
     */
    server: MinecraftServer;

    /**
     * The map to download.
     */
    map: MinecraftMap;
};

const MapDownloadButton = ({
    className,
    server,
    map,
    ...props
}: MapDownloadButtonProps): ReactElement => {
    const [downloadStatus, setDownloadStatus] = useState<
        "idle" | "downloading" | "complete"
    >("idle");
    const [progress, setProgress] = useState<number>(0);

    const downloadFile = async () => {
        try {
            setDownloadStatus("downloading");

            await downloadMapAction(map);
            const response: Response = await fetch(
                `https://s3.rainnny.club/mcmap-maps/${server._id}/${map._id}/map.zip`
            );
            const total: number = parseInt(
                response.headers.get("Content-Length") ?? "0",
                10
            );
            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error("Failed to initialize download");
            }

            let receivedLength = 0;
            const chunks: Uint8Array[] = [];
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                chunks.push(value);
                receivedLength += value.length;
                if (total) {
                    setProgress(Math.round((receivedLength / total) * 100));
                }
            }
            const objectUrl: string = window.URL.createObjectURL(
                new Blob(chunks)
            );
            const link: HTMLAnchorElement = document.createElement("a");

            link.href = objectUrl;
            link.download = `${map.name}.zip`;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(objectUrl);

            setDownloadStatus("complete");
            setTimeout(() => setDownloadStatus("idle"), 4000);
        } catch (error) {
            console.error("Download failed:", error);
            setDownloadStatus("idle");
        }
    };
    return (
        <Button
            className={cn("relative overflow-hidden", className)}
            onClick={downloadFile}
            disabled={downloadStatus !== "idle"}
            {...props}
        >
            {/* Download Status */}
            {downloadStatus === "idle" ? (
                <Download className="size-5" />
            ) : downloadStatus === "downloading" ? (
                <LoaderCircle className="size-5 animate-spin" />
            ) : (
                <FileCheck2 className="size-5" />
            )}

            <span>Download Map</span>

            {/* Progress Bar */}
            {downloadStatus === "downloading" && (
                <Progress
                    className="absolute bottom-0 h-0.5 rounded-xl"
                    value={progress}
                />
            )}
        </Button>
    );
};
export default MapDownloadButton;
