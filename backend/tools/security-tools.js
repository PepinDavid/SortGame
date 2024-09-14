import { pbkdf2 } from "pbkdf2";
import { crypto } from "crypto";

export function comparePassword(userPassword, bodyPassword) {
    // eslint-disable-next-line no-unused-vars
    const [_, iterations, salt, hash] = userPassword.split('$');

    const encoded = pbkdf2.pbkdf2Sync(bodyPassword, salt, parseInt(iterations), 32, 'sha256').toString('base64');

    if (encoded === hash) {
        return true;
    }

    return false;
}

export function createPassword(stringPassword) {
    const iterations = 216000
    const salt = crypto.randomBytes(12).toString('base64')

    const encodedPassword = pbkdf2.pbkdf2Sync(stringPassword, salt, iterations, 32, 'sha256').toString('base64');

    return 'pbkdf2_sha256$' + iterations + '$' + salt + '$' + encodedPassword;
}

export function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ&(-_)=#{[@]}$*%£+,;:!?.abcdefghijklmnopqrstuvwxyz0123456789&(-_)=#{[@]}$*%£+,;:!?.';
    const charactersLength = characters.length;
    let counter = 0;

    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    return result;
}

export function generateRandownPassword() {
    const randomString = makeid(15);

    const passwordCrypted = createPassword(randomString);

    return { passwordCrypted, password: randomString }
}

export function parseBool(val) {
    return val == '' || val == 'false' || val == null || val == undefined ? false : ParseUndefined(val);
}

export function ParseUndefined(val) {
    return val == undefined ? null : val;
}
