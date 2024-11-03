export const formatFileSize = (bytes: number): string => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    // Convert to string with 2 decimal places and remove trailing zeros
    const sizeStr = parseFloat(size.toFixed(2)).toString();
    return `${sizeStr} ${units[unitIndex]}`;
};
