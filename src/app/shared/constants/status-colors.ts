export type StatusColorKey =
    | 'blue'
    | 'orange'
    | 'green'
    | 'red'
    | 'purple'
    | 'pink'
    | 'yellow'
    | 'gray';

export type StatusColor = {
    key: StatusColorKey;
    name: string;
    light: string;
    dark: string;
};

export const STATUS_COLORS: StatusColor[] = [
    {
        key: 'blue',
        name: 'Bleu',
        light: '#E3F2FD',
        dark: '#1E3A8A',
    },
    {
        key: 'orange',
        name: 'Orange',
        light: '#FFF3E0',
        dark: '#9A3412',
    },
    {
        key: 'green',
        name: 'Vert',
        light: '#E8F5E9',
        dark: '#14532D',
    },
    {
        key: 'red',
        name: 'Rouge',
        light: '#FFEBEE',
        dark: '#991B1B',
    },
    {
        key: 'purple',
        name: 'Violet',
        light: '#F3E5F5',
        dark: '#581C87',
    },
    {
        key: 'pink',
        name: 'Rose',
        light: '#FCE4EC',
        dark: '#9F1239',
    },
    {
        key: 'yellow',
        name: 'Jaune',
        light: '#FFFDE7',
        dark: '#854D0E',
    },
    {
        key: 'gray',
        name: 'Gris',
        light: '#F5F5F5',
        dark: '#374151',
    },
];

export function getColorByKey(key: string): StatusColor | undefined {
    return STATUS_COLORS.find(color => color.key === key);
}

export function getColorByHex(hex: string): StatusColor | undefined {
    return STATUS_COLORS.find(color =>
        color.light.toLowerCase() === hex.toLowerCase() ||
        color.dark.toLowerCase() === hex.toLowerCase()
    );
}