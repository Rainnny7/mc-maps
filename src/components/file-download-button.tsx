"use client";

import {
    ComponentPropsWithoutRef,
    ReactElement,
    ReactNode,
    useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Download, FileCheck2, LoaderCircle } from "lucide-react";

type FileDownloadButtonProps = ComponentPropsWithoutRef<typeof Button> & {
    /**
     * The URL of the file to download.
     */
    url: string;

    /**
     * The name of the file to download.
     */
    fileName: string;

    /**
     * The trigger to download the file.
     */
    children: ReactNode;
};

const FileDownloadButton = ({
    url,
    fileName,
    children,
    ...props
}: FileDownloadButtonProps): ReactElement => {
    const [downloadStatus, setDownloadStatus] = useState<
        "idle" | "downloading" | "complete"
    >("idle");
    const [progress, setProgress] = useState<number>(0);

    const downloadFile = async () => {
        try {
            setDownloadStatus("downloading");

            const response = await fetch(url);
            const contentLength = response.headers.get("content-length");
            const total = parseInt(contentLength ?? "0", 10);

            const reader = response.body?.getReader();
            if (!reader) throw new Error("Failed to initialize download");

            let receivedLength = 0;
            const chunks: Uint8Array[] = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                chunks.push(value);
                receivedLength += value.length;

                if (total) {
                    setProgress(Math.round((receivedLength / total) * 100));
                }
            }

            const blob = new Blob(chunks);
            const objectUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = fileName;
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
        <Button onClick={downloadFile} {...props}>
            {/* Download Status */}
            {downloadStatus === "idle" ? (
                <Download className="size-5" />
            ) : downloadStatus === "downloading" ? (
                <LoaderCircle className="size-5 animate-spin" />
            ) : (
                <FileCheck2 className="size-5" />
            )}

            {/* Trigger */}
            {children}
        </Button>
    );
};
export default FileDownloadButton;