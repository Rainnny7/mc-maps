/**
 * Capitalize the first letter of a string and lowercase the rest.
 *
 * @param str the string to capitalize
 */
export const capitalize = (str: string) => {
    return str
        .toLowerCase()
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");
};
