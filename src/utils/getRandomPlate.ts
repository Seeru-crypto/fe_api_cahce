export function getRandomPlate() {
    const letters = getString();
    const numbers = generateRandomNumberString();
    const res = {
        string: letters,
        numbers: numbers}
    return res
}

function getString() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 3; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
}

function generateRandomNumberString() {
    const numbers = '0123456789';
    let result = '';
    for (let i = 0; i < 3; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
}