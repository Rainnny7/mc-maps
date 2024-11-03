import { ScreenSize } from "@/types/screen-size";
import { useEffect, useState } from "react";

type ScreenSizeProps = {
    size: ScreenSize;
};

export const useIsScreenSize = ({ size }: ScreenSizeProps) => {
    const [isScreenSize, setIsScreenSize] = useState<boolean>();

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSize(window.innerWidth >= size);
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [size]);

    return isScreenSize;
};
