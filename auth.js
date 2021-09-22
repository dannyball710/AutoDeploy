import config from '~/auto-deploy.config.json';
import bcrypt from 'bcrypt';

var token = undefined;
let tokenLength = 32;
export async function login(password) {
    let v = await bcrypt.compare(password, config.password);
    if (!v) {
        return false;
    }
    token = newToken();
    return token;
}

export function checkToken(val) {
    return token == val;
}

let words = "abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789";
export function newToken() {
    let v = "";
    for (let i = 1; i <= tokenLength; i++) {
        v += words[parseInt(words.length * Math.random())];
    }
    return v;
}