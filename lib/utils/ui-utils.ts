export function FormatBulletPoints(items: string[]): string {
    return items.map((item) => `• ${item}`).join("\n");
}
