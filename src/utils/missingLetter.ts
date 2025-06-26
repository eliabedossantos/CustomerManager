export function getMissingLetter(name: string): string {
    const normalized = name
        .toLowerCase()
        .normalize('NFD') 
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z]/g, '');

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (const letter of alphabet) {
        if (!normalized.includes(letter)) {
            return letter;
        }
    }

    return '-';
}