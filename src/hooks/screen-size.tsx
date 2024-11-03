import {ScreenSize} from "@/types/screen-size";
import {useEffect, useState} from "react";

/**
 * A hook to check if the screen
 * size is at least the given size.
 *
 * @param size the screen size to check
 */
export const useIsScreenSize = ({ size }: { size: ScreenSize }) => {
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
