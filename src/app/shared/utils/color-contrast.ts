/**
 * Convertit une couleur hexadécimale en RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    // Enlever le # si présent
    const cleanHex = hex.replace('#', '');

    // Gestion du format court (#fff) et long (#ffffff)
    const shorthandRegex = /^([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = cleanHex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/**
 * Calcule la luminosité relative d'une couleur RGB
 * Formule basée sur la perception humaine des couleurs
 */
function getLuminance(r: number, g: number, b: number): number {
    // Normaliser les valeurs RGB (0-255 -> 0-1)
    const [rs, gs, bs] = [r, g, b].map(val => {
        const normalized = val / 255;
        return normalized <= 0.03928
            ? normalized / 12.92
            : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });

    // Formule WCAG pour la luminosité relative
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Détermine si le texte doit être noir ou blanc pour avoir un bon contraste
 * avec la couleur de fond donnée
 *
 * @param backgroundColor - Couleur de fond en format hexadécimal (#RRGGBB ou #RGB)
 * @returns La couleur de texte optimale ('#000000' ou '#FFFFFF')
 */
export function getContrastTextColor(backgroundColor: string): string {
    // Gérer les cas où la couleur n'est pas un hex (var CSS, etc.)
    if (!backgroundColor || backgroundColor.startsWith('var(')) {
        return '#000000'; // Défaut : texte noir
    }

    const rgb = hexToRgb(backgroundColor);

    if (!rgb) {
        return '#000000'; // Défaut si la conversion échoue
    }

    const luminance = getLuminance(rgb.r, rgb.g, rgb.b);

    // Si la luminance est > 0.5, utiliser du texte noir, sinon blanc
    // Cette valeur donne généralement un ratio de contraste conforme WCAG AA (4.5:1 minimum)
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}