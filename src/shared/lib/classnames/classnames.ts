export type Mods = Record<string, boolean | string | undefined>;

export function classNames(
    styles: string | null,
    mods: Mods = {},
    additional: Array<string | undefined | null> = [],
): string {
    return [
        styles,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([, value]) => Boolean(value))
            .map(([className]) => className),
    ].join(' ');
}
