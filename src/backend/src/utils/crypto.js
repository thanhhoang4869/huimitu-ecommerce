import CryptoJS from 'crypto-js'
import config from '#src/config/config'

/**
 * Sign the message using secret key by HmacSHA256 
 * 
 * @param {String} message The message need to be signed
 * @param {String} key The secret key used to sign
 * @returns The signature after signing the message using the key
 */
const createHmacString = (message, key) => {
    const keyByte = CryptoJS.enc.Utf8.parse(key)
    const messageByte = CryptoJS.enc.Utf8.parse(message)
    const signature = CryptoJS.enc.Hex.stringify(
        CryptoJS.HmacSHA256(messageByte, keyByte)
    )
    return signature
}

/**
 * Encode the message with Base64
 * 
 * @param {String} message The message need to be encoded
 * @returns {String} The encoded message
 */
const encryptBase64 = (message) => {
    const wordArray = CryptoJS.enc.Utf8.parse(message)
    const signature = CryptoJS.enc.Base64.stringify(wordArray)
    return signature
}

/**
 * Decode the signature to message with Base64
 * 
 * @param {String} signature The encoded message
 * @returns {String} The message after decoding
 */
const decryptBase64 = (signature) => {
    const wordArray = CryptoJS.enc.Base64.parse(signature)
    const message = CryptoJS.enc.Utf8.stringify(wordArray)
    return message
}

/**
 * Generate a random token whose size is `nByte`
 * 
 * @param {int} nByte The number of byte of the tokens
 * @returns {string} The hex string of generated token
 */
const generateToken = (nByte) => {
    const token = CryptoJS.lib.WordArray.random(nByte).toString();
    return token;
}

/**
 * Encrypt the input password with salt
 * 
 * @param {String} password The password need to be encrypted
 * @returns {String} The password after encrypting
 */
const encryptPassword = (password) => {
    const salt = generateToken(config.NUMBER_BYTE_SALT);
    const hashedPassword = CryptoJS.SHA256(salt + password).toString();
    const finalPassword = encryptBase64([salt, hashedPassword].join("&"))
    return finalPassword;
}

/**
 * Verify the input password with encrypted password
 * 
 * @param {String} input The password user input
 * @param {String} signature The encrypted password
 * @returns {bool} The correctness of password
 */
const verifyPassword = (input, signature) => {
    // Get salt
    const [salt, hashedSignature] = decryptBase64(signature).split("&")

    // Compare the password
    const hashedInput = CryptoJS.SHA256(salt + input).toString();
    return (hashedInput === hashedSignature)
}

export {
    createHmacString,
    generateToken,
    encryptPassword,
    verifyPassword,
    encryptBase64,
    decryptBase64
}