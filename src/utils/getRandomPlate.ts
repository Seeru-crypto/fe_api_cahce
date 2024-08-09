import {IPlate} from "../models/IPlate.ts";

export function getRandomPlate():IPlate {
    const letters = getString();
    const plateNumbers = generateRandomNumberString();

    return {letters, plateNumbers}
}

function getString(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 3; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
}

function generateRandomNumberString():string {
    const numbers = '0123456789';
    let result = '';
    for (let i = 0; i < 3; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
}